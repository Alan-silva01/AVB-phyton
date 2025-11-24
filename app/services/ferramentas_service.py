from datetime import datetime
from typing import List, Dict, Any
from app.database.connection import execute_command, execute_query
from app.utils.datetime_utils import formatar_data_hora
import pytz


class FerramentasService:
    """Serviço para gerenciar ferramentas"""

    async def registrar_emprestimo(
        self,
        funcionario: str,
        matricula: str,
        setor: str,
        itens: List[Dict[str, Any]]
    ):
        """Registrar empréstimo de ferramentas"""

        # Data e hora atual em Brasília
        tz_brasilia = pytz.timezone('America/Sao_Paulo')
        agora = datetime.now(tz_brasilia)
        data_hora = agora.strftime('%Y-%m-%d %H:%M:%S')

        for item in itens:
            tag = item.get('tag')
            quantidade = item.get('quantidade', 1)

            # Atualizar ferramenta (baixa estoque, registra posse)
            query = """
                UPDATE ferramentas
                SET
                    saiu = saiu + $1,
                    funcionario_emprestado = $2,
                    matricula = $3,
                    data_emprestado = $4,
                    status = 'emprestada'
                WHERE tag = $5
            """

            await execute_command(
                query,
                quantidade,
                funcionario,
                matricula,
                data_hora,
                tag
            )

        return {"status": "success", "itens": len(itens)}

    async def registrar_devolucao(
        self,
        funcionario: str,
        matricula: str,
        setor: str,
        itens: List[Dict[str, Any]]
    ):
        """Registrar devolução de ferramentas"""

        for item in itens:
            tag = item.get('tag')

            # Voltar ferramenta (aumenta estoque, limpa posse)
            query = """
                UPDATE ferramentas
                SET
                    saiu = GREATEST(saiu - 1, 0),
                    funcionario_emprestado = NULL,
                    matricula = NULL,
                    data_emprestado = NULL,
                    status = CASE
                        WHEN (quantidade - (saiu - 1)) > 0 THEN 'disponível'
                        ELSE 'emprestada'
                    END
                WHERE tag = $1
            """

            await execute_command(query, tag)

        return {"status": "success", "itens": len(itens)}

    def formatar_mensagem_emprestimo(
        self,
        funcionario: str,
        matricula: str,
        setor: str,
        itens: List[Dict[str, Any]]
    ) -> str:
        """Formatar mensagem de empréstimo para WhatsApp"""

        # Lista de ferramentas
        lista = '\n'.join([
            f"🔧 *TAG {item['tag']}* – {item['nome']}"
            for item in itens
        ])

        # Data/hora formatada
        data_hora = formatar_data_hora()

        mensagem = f"""📢 *Retirada de ferramenta – AVB*

👷 Funcionário
*{funcionario}*
🆔 Matrícula: {matricula}
🏭 Setor: {setor}

📦 Itens retirados da ferramentaria:
{lista}

📅 {data_hora}"""

        return mensagem

    def formatar_mensagem_devolucao(
        self,
        funcionario: str,
        matricula: str,
        setor: str,
        itens: List[Dict[str, Any]]
    ) -> str:
        """Formatar mensagem de devolução para WhatsApp"""

        # Lista de ferramentas
        lista = '\n'.join([
            f"🔧 *TAG {item['tag']}* – {item['nome']}"
            for item in itens
        ])

        # Data/hora formatada
        data_hora = formatar_data_hora()

        mensagem = f"""📢 *Devolução de ferramenta – AVB*

👷 Funcionário
*{funcionario}*
🆔 Matrícula: {matricula}
🏭 Setor: {setor}

📦 Itens devolvidos na ferramentaria:
{lista}

📅 {data_hora}"""

        return mensagem
