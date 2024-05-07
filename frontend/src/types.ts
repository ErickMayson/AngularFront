import { HttpHeaders, HttpContext, HttpParams } from "@angular/common/http";

export interface Options {
        headers?:
        HttpHeaders
        | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        context?: HttpContext;
        params?:
        HttpParams
        | {
          [param: string]:
             string
           | number
           | boolean
           | ReadonlyArray<string
           | number
           | boolean>;
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }

    export interface Pedidos {
      pedidos: Pedido[];
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    }

    export interface Pedido {
      id?: number;
      dataPedido: string;
      descricao?: string;
      valor: number;
      status: string;
      cliente?: number;
    }

    export interface Clientes {
    clientes: Cliente[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    }


    export interface Cliente {

      id?: number;
      nome: string;
      email: string;
      telefone: string;
      endereco: string;

    }

    export interface PaginationParams {
      [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      page: number;
      perPage: number;
    }
