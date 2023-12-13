import { randomUUID } from "crypto"


export class DatabaseMemory{
    #musculacoes = new Map()

list(search){
    return Array.from(this.#musculacoes.entries()).map((musculacaoArray) => {
        const id = musculacaoArray[0]

        const data = musculacaoArray[1]

        return{
            id,
            ...data,
        }

        
        })
        .filter(musculacao => {
            if (search){
            return musculacao.titulo.includes(search)
            }
            return true
    })
}

    create(musculacao){
        const musculacaoId = randomUUID()
        this.#musculacoes.set(musculacaoId, musculacao)
    }
    
    update(id, musculacao){
        this.#musculacoes.set(id, musculacao)
    }

    delete(id, musculacao){
        this.#musculacoes.delete(id, musculacao)
    }
}