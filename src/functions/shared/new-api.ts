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

type TopLevelError<D> = {
  message: string;
  fields?: FieldErrors<D>;
};

type ResponseType<ResponseData, RequestData> = {
  data: null | ResponseData;
  errors: null | TopLevelError<RequestData>;
  status: number;
};

type Config = AxiosRequestConfig & {
  notFoundOn404?: boolean;
  defaultData?: any;
};

class API {
  private static readonly isServer: boolean = typeof window === 'undefined';

  private static axiosInstance(baseURL: string = process.env.NEXT_PUBLIC_API_URL): AxiosInstance {
    return axios.create({
      baseURL,
      timeout: 10_000,
    });
  }

  public static async get<ResponseData, QueryParams = null>(
    url: string,
    config?: Config,
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
    config?: Config,
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
    config?: Config,
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
    config?: Config,
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
    config?: Config,
  ): Promise<ResponseType<ResponseData, QueryParams>> {
    try {
      const response = await this.axiosInstance().delete<ResponseData>(url, config);

      return this.handleResponse<ResponseData>(response);
    } catch (error) {
      return this.handleError<QueryParams>(error);
    }
  }

  private static handleResponse<Response>(response: AxiosResponse<Response>): ResponseType<Response, any> {
    const { data, status } = response;

    return { data, errors: null, status };
  }

  private static handleError<RequestDataOrQueryParams>(error: unknown): ResponseType<null, RequestDataOrQueryParams> {
    if (isAxiosError<ResponseType<null, RequestDataOrQueryParams>>(error)) {
      if (error.response) {
        console.error('RESPONSE_ERROR: ', error);
        const { data, status } = error.response;
        const config = error.config as Config;

        if (this.isServer && error.response.status === 404 && config.notFoundOn404) {
          notFound();
        }

        return { data: null, errors: data.errors, status };
      } else if (error.request) {
        console.error('REQUEST_ERROR: ', error);

        return {
          data: null,
          errors: {
            message: 'Verbinding of server-fout. Probeer het later opnieuw.',
          },
          status: 0,
        };
      } else {
        console.error('UNKNOWN_ERROR_0: ', error);

        return {
          data: null,
          errors: { message: 'Er ging iets mis met het vormen van het verzoek.' },
          status: 0,
        };
      }
    } else {
      console.error('UNKNOWN_ERROR_1: ', error);

      return { data: null, errors: { message: 'Er ging iets mis met de applicatie.' }, status: 0 };
    }
  }
}

export { API };
export type { ResponseType, TopLevelError, FieldError, FieldErrors };
