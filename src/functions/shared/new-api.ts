import { captureException } from '@sentry/nextjs';
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
  errors: null | Errors<RequestData>;
  status: number;
};

type ApiConfig = AxiosRequestConfig & {
  notFoundOn404?: boolean;
  defaultData?: any;
  throwOnError?: boolean;
};

/**
 * Represents an error object with optional fields, configuration, and status.
 */
class Errors<D> extends Error {
  public message: string;
  public fields?: FieldErrors<D>;
  public config?: ApiConfig;
  public status?: number;

  constructor({ message, fields, config, status = 0 }: TopLevelError<D> & { config?: ApiConfig; status?: number }) {
    super(message);
    this.message = message;
    this.fields = fields;
    this.config = config;
    this.status = status;
  }

  /**
   * Retrieves the fields of the object.
   *
   * @returns object of which each key is a field name and each value is an object with a `message` and `all` array.
   */
  public getFields() {
    return this.fields;
  }

  /**
   * Retrieves the error message associated with the specified field.
   *
   * @param field - The key of the field to retrieve the error message for.
   * @return The error message for the specified field, or undefined if no error message is found.
   */
  public getErrorMessageFromField(field: keyof D) {
    return (<FieldError>this.fields?.[field]).message;
  }

  /**
   * Retrieves all errors associated with a specific field.
   *
   * @param field - The field name to get errors from.
   * @return An array of error messages for the specified field.
   */
  public getAllErrorsFromField(field: keyof D) {
    return (<FieldError>this.fields?.[field]).all;
  }

  /**
   * Retrieves the error message associated with the object.
   */
  public getMessage() {
    return this.message;
  }
}

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

  private static handleResponse<Response>(response: AxiosResponse<Response>): ResponseType<Response, any> {
    const { data, status } = response;

    return { data, errors: null, status };
  }

  private static handleError<RequestDataOrQueryParams>(error: unknown): ResponseType<null, RequestDataOrQueryParams> {
    if (isAxiosError<ResponseType<null, RequestDataOrQueryParams>>(error)) {
      const config = error.config as ApiConfig;
      const defaultData = config.defaultData ?? null;

      if (error.response) {
        console.error('RESPONSE_ERROR: ', error);
        const { data, status } = error.response;
        const config = error.config as ApiConfig;

        if (this.isServer && error.response.status === 404 && config.notFoundOn404) {
          notFound();
        }

        if (!data.errors) throw new Error('Server response does not contain errors key, contact the developer.');

        return {
          data: defaultData,
          errors: new Errors({ message: data.errors?.message, fields: data.errors?.fields, config, status }),
          status,
        };
      } else if (error.request) {
        console.error('REQUEST_ERROR: ', error);
        const config = error.config as ApiConfig;

        if (this.isServer) {
          captureException(error, {
            extra: {
              config,
            },
          });
        }

        return {
          data: defaultData,
          errors: new Errors({ message: 'Verbinding of server-fout. Probeer het later opnieuw.', config, status: 0 }),
          status: 0,
        };
      } else {
        console.error('UNKNOWN_ERROR_0: ', error);

        captureException(error, { extra: { config } });

        return {
          data: defaultData,
          errors: new Errors({ message: 'Er ging iets mis met het vormen van het verzoek.', config, status: 0 }),
          status: 0,
        };
      }
    } else {
      console.error('UNKNOWN_ERROR_1: ', error);
      captureException(error);

      return {
        data: null,
        errors: new Errors({ message: 'Er ging iets mis met de applicatie.', config: {}, status: 0 }),
        status: 0,
      };
    }
  }
}

export { API };
export type { ResponseType, TopLevelError, FieldError, FieldErrors, ApiConfig };
