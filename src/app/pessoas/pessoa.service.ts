import { Pessoa } from './../core/model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();


    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    } else {
      params = params.set('nome', ""); // colocar esse else para funcionar pessoas, que não vem por padrão paginado quando solicitado sem filtro
    }

  return this.http.get(`${this.pessoasUrl}`,
      { params })

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


    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then((response: any) =>
        response
    );


  }

  excluir(codigo: number): Promise<void> {


    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {


    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
    .toPromise();

  }

  adicionar(pessoa: Pessoa): Promise<any> {




    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
    .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<any> {


    return this.http.put<void>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    .toPromise()
    .then((response: any) => {
      return response;
    });
  }

  buscarPorCodigo(codigo: number): Promise<any> {


    return this.http.get(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then((response: any) => {
      return response;
    });
  }

}
