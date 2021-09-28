import Cliente from '../../core/Cliente';
import ClienteRepositorio from '../../core/ClienteRepositorio'

import firebase from '../config'

export default class ColecaoCliente implements ClienteRepositorio {

    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {

        //caso o ide já estaja setado o cliente cliente e alterado
        if (cliente?.id) {
            await this.colecao().doc(cliente.id).set(cliente)
            return cliente

            //cado não esteja, um novo cliente sera adicionado a coleção
        } else {
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }
    }
    //excluindo um cliente por id
    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.id).delete()
    }
    //obterTodos osclientes cadastrados 
    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)

    }

}