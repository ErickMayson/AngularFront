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
      pedidos: Pedidos[];

    }

    export interface Pedido {
      id: number;
      dataPedido: Date;
      descricao: string;
      valor: number;
      status: string;
      cliente: number;
    }

    export interface Clientes {
      clientes: Clientes[];
    }

    export interface Cliente {

      id: number;
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
