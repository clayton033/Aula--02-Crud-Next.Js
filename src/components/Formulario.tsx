import React, { useState } from "react";
import Cliente from "../core/Cliente";
import Entrada from "./Entrada";

import Button from "../components/Botao"

interface FormularioProps {
    cliente: Cliente
    cancelado?: () => void
    clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario(props: FormularioProps) {

    //pegando id do cliente
    //se não tiver cliente: null 
    const id = props.cliente?.id

    //setando um novo Cliente
    //se não tiver cliente aparece vazio
    const [nome, setNome] = useState(props.cliente?.nome ?? '')

    //se não passou o valor de idade, assume o valor de 0
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

    return (
        <div>
            {id ? (
                <Entrada
                    //quando for gerado um id. o campo permanece só leitura
                    somenteLeitura
                    texto="Código"
                    valor={id}
                    className="mb-5"
                />
            ) : false}


            <Entrada
                texto="Nome"
                valor={nome}
                valorMudou={setNome}
                className="mb-5"
            />
            <Entrada
                texto="Idade"
                tipo="number"
                valor={idade}
                valorMudou={setIdade}
            />
            <div className=" flex justify-end mt-7">
                <Button
                    cor="blue"
                    className="mr-2"
                        onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id)) }>
                    {id ? 'Alterar' : 'Salvar'}

                </Button>
            
                <Button onClick={props.cancelado}>
                    Cancelar
                </Button>
          
            </div>
        </div>
    )
}