import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas'
  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    } else {
      params = params.set('nome', ""); // colocar esse else para funcionar pessoas, que não vem por padrão paginado quando solicitado sem filtro
    }

  return this.http.get(`${this.pessoasUrl}`,
      { headers, params })

    .toPromise()

    .then((response: any) => {

      const pessoas = response['content'];



      const resultado = {
        pessoas,
        total: response['totalElements']
      };

      return resultado;

    });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then((response: any) =>
        response
    );


  }
}