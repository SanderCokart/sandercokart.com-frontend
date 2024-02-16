import axios, { isAxiosError } from 'axios';

import { notFound } from 'next/navigation';

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type FieldError = {
  message: string;
  all: string[];
};

type FieldErrors<DATA> = {
  [KEY in keyof DATA]: DATA[KEY] extends object ? FieldErrors<DATA[KEY]> : FieldError;
};

type SuccessResponse<ResponseData> = {
  data: ResponseData;
  errors: null;
  status: number;
};

type ErrorResponse<RequestData> = {
  data: null;
  errors: Errors<RequestData>;
  status: number;
};

type ResponseType<ResponseData, RequestData> = SuccessResponse<ResponseData> | ErrorResponse<RequestData>;

type ApiConfig = AxiosRequestConfig & {
  notFoundOn404?: boolean;
  defaultData?: any;
};

export type Errors<D> = {
  message: string;
  fields?: FieldErrors<D>;
};

class API {
  private static readonly isServer: boolean = typeof window === 'undefined';

  private static axiosInstance(baseURL: string = process.env.NEXT_PUBLIC_API_URL): AxiosInstance {
    return axios.create({
      baseURL,
      timeout: 10_000,
      timeoutErrorMessage:
        'Our server took too long to respond. This may be due to a slow internet connection, high server load, or a bug in our code. Please try again later.',
    });
  }

  public static async get<ResponseData, QueryParams = null>(
    url: string,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, QueryParams>> {
    try {
      const response = await this.axiosInstance().get<ResponseData>(url, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<QueryParams>(error);
    }
  }

  public static async post<ResponseData, RequestData = null>(
    url: string,
    data: RequestData,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, RequestData>> {
    try {
      const response = await this.axiosInstance().post<ResponseData>(url, data, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<RequestData>(error);
    }
  }

  public static async put<ResponseData, RequestData = null>(
    url: string,
    data?: any,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, RequestData>> {
    try {
      const response = await this.axiosInstance().put<ResponseData>(url, data, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<RequestData>(error);
    }
  }

  public static async patch<ResponseData, RequestData = null>(
    url: string,
    data?: any,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, RequestData>> {
    try {
      const response = await this.axiosInstance().patch<ResponseData>(url, data, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<RequestData>(error);
    }
  }

  public static async delete<ResponseData, QueryParams = null>(
    url: string,
    config?: ApiConfig,
  ): Promise<ResponseType<ResponseData, QueryParams>> {
    try {
      const response = await this.axiosInstance().delete<ResponseData>(url, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<QueryParams>(error);
    }
  }

  private static handleResponse<ResponseData>(response: AxiosResponse<ResponseData>): SuccessResponse<ResponseData> {
    const { data, status } = response;

    return { data, errors: null, status };
  }

  private static handleError<RequestDataOrQueryParams>(error: unknown): ErrorResponse<RequestDataOrQueryParams> {
    if (isAxiosError<ResponseType<null, RequestDataOrQueryParams>>(error)) {
      const config = error.config as ApiConfig;
      const defaultData = config.defaultData ?? null;

      console.info('URL: ', `${config.baseURL}${config.url}?${new URLSearchParams(config.params).toString()}`);

      if (error.response) {
        const { data, status } = error.response;
        const config = error.config as ApiConfig;

        if (this.isServer && error.response.status === 404 && config.notFoundOn404) {
          notFound();
        }

        if (data.errors)
          return {
            data: defaultData,
            errors: {
              message: data.errors?.message,
              fields: data.errors?.fields,
            },
            status,
          };

        console.error('RESPONSE_ERROR: ', error);

        return {
          data: defaultData,
          errors: {
            message: 'Er ging iets mis met de server. Probeer het later opnieuw.',
          },
          status,
        };
      } else if (error.request) {
        const config = error.config as ApiConfig;

        console.error('REQUEST_ERROR: ', error);

        return {
          data: defaultData,
          errors: {
            message: 'Verbinding of server-fout. Probeer het later opnieuw.',
          },
          status: 0,
        };
      } else {
        console.error('UNKNOWN_ERROR_0: ', error);

        return {
          data: defaultData,
          errors: {
            message: 'Er ging iets mis met het vormen van het verzoek.',
          },
          status: 0,
        };
      }
    } else {
      console.error('UNKNOWN_ERROR_1: ', error);

      return {
        data: null,
        errors: {
          message: 'Er ging iets mis met de applicatie.',
        },
        status: 0,
      };
    }
  }
}

export { API };
export type { ResponseType, FieldError, FieldErrors, ApiConfig };
