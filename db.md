erDiagram
    USUARIO ||--o{ APOSTA : realiza
    APOSTA }o--|| JOGO : pertence
    APOSTA }o--|| RESULTADO : gera

    USUARIO {
        int id_usuario PK
        string nome
        string email
        decimal saldo
    }

    JOGO {
        int id_jogo PK
        datetime data_hora
        string status
    }

    APOSTA {
        int id_aposta PK
        int id_usuario FK
        int id_jogo FK
        decimal valor
        string escolha
    }

    RESULTADO {
        int id_resultado PK
        int id_jogo FK
        string combinacao
        boolean ganhou
        decimal premio
    }
