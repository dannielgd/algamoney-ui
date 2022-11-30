export class Pessoa {
  codigo?: number;
}

export class Categoria {
  codigo?: number;
}

export class Lancamento {
  codigo?: number;
  tipo = 'RECEITA';
  descricao?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor?: number;
  observacao?: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

  json(lancamento: Lancamento) : any {

    const lancamentoJSON = {
      tipo: lancamento.tipo,
      descricao: lancamento.descricao,
      dataVencimento: lancamento.dataVencimento?.toLocaleDateString().toString(),
      dataPagamento: lancamento.dataPagamento?.toLocaleDateString().toString(),
      valor: lancamento.valor,
      observacao: lancamento.observacao,
      pessoa: { codigo: lancamento.pessoa.codigo },
      categoria: { codigo: lancamento.categoria.codigo }
    }


    return lancamentoJSON;
  }
}
