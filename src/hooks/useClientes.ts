import Cliente from "../core/Cliente";

import { useState, useEffect } from 'react'
import ClienteRepositorio from "../core/ClienteRepositorio";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import useTabelaOuForm from "../hooks/useTabelaOuForm"


export default function useClientes() {

    const repo: ClienteRepositorio = new ColecaoCliente()

    const { tabelaVisivel, exibirFormulario, exibirTabela } = useTabelaOuForm()

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])



    //chamado na inicialização do component
    useEffect(obterTodos, [])



    function obterTodos() {
        //obterTodos/setar os clientes  então mostrar todos na tabela
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }

    function clienteSelecionado(cliente: Cliente) {
        setCliente(cliente)
        exibirFormulario()
    }


    async function clienteExcluido(cliente: Cliente) {
        await repo.excluir(cliente)
        obterTodos()
    }

    function novoCliente() {
        setCliente(Cliente.vazio())
        exibirFormulario()
    }

    async function salvarCliente(cliente: Cliente) {
        await repo.salvar(cliente)
        obterTodos()
    }

    function exibirTexto() {
        return "Clique em Novo Cliente Para Cadastrar"
    }

    return {
        cliente,
        clientes,
        novoCliente,
        salvarCliente,
        clienteExcluido,
        clienteSelecionado,
        obterTodos,
        tabelaVisivel,
        exibirTabela,
        exibirTexto,
    }
}