import { Lancamento } from './../core/model';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos'
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
  }

  return this.http.get(`${this.lancamentosUrl}?resumo`,
      { headers, params })

    .toPromise()

    .then((response: any) => {

      const lancamentos = response['content'];

      const resultado = {
        lancamentos,
        total: response['totalElements']
      };

      return resultado;

    });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise();

  }

  adicionar(lancamento: Lancamento): Promise<any> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
    .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
    .toPromise()
    .then((response: any) => {
      return this.converterStringsParaDatas(response);

      // return response;
    });
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then((response: any) => {

      return this.converterStringsParaDatas(response);

      return response;
    });
  }

  converterStringsParaDatas(lancamento: any): Lancamento {

      // let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(lancamento.dataVencimento.slice(6,10) + '-' + lancamento.dataVencimento.slice(3,5) + '-' + lancamento.dataVencimento.slice(0,2));
      lancamento.dataVencimento.setDate(lancamento.dataVencimento.getDate()+1)

      if (lancamento.dataPagamento != null) {
        lancamento.dataPagamento = new Date(lancamento.dataPagamento.slice(6,10) + '-' + lancamento.dataPagamento.slice(3,5) + '-' + lancamento.dataPagamento.slice(0,2));

      lancamento.dataPagamento.setDate(lancamento.dataPagamento.getDate()+1);
    }


      return lancamento;
  }

}
