from langchain.tools import tool
from app.database.connection import execute_query
from datetime import datetime
import pytz


@tool
async def buscar_ferramentas(query: str) -> str:
    """
    Busca ferramentas no estoque usando SQL.

    Exemplos de queries:
    - SELECT * FROM search_tools() - Todas as ferramentas
    - SELECT * FROM search_tools(p_nome => 'furadeira') - Por nome
    - SELECT * FROM search_tools(p_status => 'disponível') - Por status
    - SELECT * FROM search_tools(p_tag => 'TAG007') - Por tag
    - SELECT * FROM search_tools(p_funcionario => 'João') - Por funcionário
    - SELECT * FROM search_tools(p_detalhado => TRUE) - Com detalhes

    Args:
        query: SQL query usando a função search_tools()

    Returns:
        Resultado da busca em formato texto
    """
    try:
        # Executar query
        result = await execute_query(query)

        if not result:
            return "Nenhuma ferramenta encontrada com os critérios especificados."

        # Formatar resultado
        output = []
        for row in result:
            ferramenta = dict(row)
            linha = f"• {ferramenta.get('nome', 'N/A')}"

            if ferramenta.get('tag'):
                linha += f" (TAG: {ferramenta['tag']})"

            if ferramenta.get('quantidade_disponivel') is not None:
                linha += f" - Disponível: {ferramenta['quantidade_disponivel']}"

            # Informações detalhadas (se solicitadas)
            if ferramenta.get('tipo'):
                linha += f"\n  Tipo: {ferramenta['tipo']}"

            if ferramenta.get('status'):
                linha += f"\n  Status: {ferramenta['status']}"

            if ferramenta.get('funcionario_emprestado'):
                linha += f"\n  Emprestada para: {ferramenta['funcionario_emprestado']}"
                if ferramenta.get('matricula'):
                    linha += f" (Matrícula: {ferramenta['matricula']})"
                if ferramenta.get('data_emprestado'):
                    linha += f"\n  Data empréstimo: {ferramenta['data_emprestado']}"

            if ferramenta.get('reserva') and ferramenta.get('matricula_reserva'):
                linha += f"\n  ⚠️ RESERVADA para matrícula: {ferramenta['matricula_reserva']}"

            output.append(linha)

        return "\n\n".join(output)

    except Exception as e:
        return f"Erro ao buscar ferramentas: {str(e)}"


@tool
async def buscar_materiais(query: str) -> str:
    """
    Busca materiais de consumo no estoque usando SQL.

    Exemplos de queries:
    - SELECT * FROM search_materiais() - Todos os materiais
    - SELECT * FROM search_materiais(p_nome => 'álcool') - Por nome
    - SELECT * FROM search_materiais(p_tag => 10029) - Por tag
    - SELECT * FROM search_materiais(p_estoque_baixo => TRUE) - Estoque baixo

    Args:
        query: SQL query usando a função search_materiais()

    Returns:
        Resultado da busca em formato texto
    """
    try:
        # Executar query
        result = await execute_query(query)

        if not result:
            return "Nenhum material encontrado com os critérios especificados."

        # Formatar resultado
        output = []
        for row in result:
            material = dict(row)
            linha = f"• {material.get('nome', 'N/A')}"

            if material.get('tag'):
                linha += f" (TAG: {material['tag']})"

            if material.get('quantidade_disponivel') is not None:
                linha += f" - Disponível: {material['quantidade_disponivel']}"

            output.append(linha)

        return "\n\n".join(output)

    except Exception as e:
        return f"Erro ao buscar materiais: {str(e)}"


@tool
async def buscar_movimentacoes(query: str) -> str:
    """
    Busca movimentações de ferramentas (histórico de empréstimos/devoluções).

    Args:
        query: SQL query para buscar movimentações

    Returns:
        Histórico de movimentações
    """
    try:
        # Executar query
        result = await execute_query(query)

        if not result:
            return "Nenhuma movimentação encontrada."

        # Formatar resultado
        output = []
        for row in result:
            mov = dict(row)
            output.append(str(mov))

        return "\n\n".join(output)

    except Exception as e:
        return f"Erro ao buscar movimentações: {str(e)}"


def get_all_tools():
    """Retorna todas as tools disponíveis para o agente"""
    return [buscar_ferramentas, buscar_materiais, buscar_movimentacoes]


def get_current_datetime() -> str:
    """Retorna data e hora atual em português (Brasília)"""
    tz_brasilia = pytz.timezone('America/Sao_Paulo')
    agora = datetime.now(tz_brasilia)

    dias_semana = {
        0: 'segunda-feira',
        1: 'terça-feira',
        2: 'quarta-feira',
        3: 'quinta-feira',
        4: 'sexta-feira',
        5: 'sábado',
        6: 'domingo'
    }

    dia_semana = dias_semana[agora.weekday()]
    return agora.strftime(f'{dia_semana}, %d-%m-%Y - %H:%M:%S')
