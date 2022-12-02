import { LancamentoService } from './../lancamento.service';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {

    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {

    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {

    if(this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }

  }

  adicionarLancamento(form: NgForm) {

    this.lancamentoService.adicionar(this.lancamento.json(this.lancamento))
    .then(lancamentoAdicionado =>{
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });


      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarLancamento(form: NgForm) {

    this.lancamentoService.atualizar(this.json(this.lancamento))
      .then(lancamento => {
        this.lancamento = lancamento;
        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  json(lancamento: Lancamento) : any {

    const lancamentoJSON = {
      codigo: lancamento.codigo,
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

  carregarPessoas() {
    return this.pessoasService.listarTodas()
    .then(pessoas => {

      this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }

}
