from datetime import datetime
import pytz


def formatar_data_hora(data_str: str = None, hora_str: str = None) -> str:
    """
    Formatar data e hora para formato brasileiro

    Se data_str e hora_str não forem fornecidos, usa data/hora atual
    """

    tz_brasilia = pytz.timezone('America/Sao_Paulo')

    if data_str and hora_str:
        # Parsear data fornecida
        ano, mes, dia = data_str.split("-")
        hora, minuto = hora_str.split(":")
        data_utc = datetime(int(ano), int(mes), int(dia), int(hora), int(minuto))
        data_utc = tz_brasilia.localize(data_utc)
    else:
        # Usar data/hora atual
        data_utc = datetime.now(tz_brasilia)

    # Data de hoje para comparação
    hoje = datetime.now(tz_brasilia).date()

    # Verificar se é hoje
    mesma_data = data_utc.date() == hoje

    # Formatação
    dias_semana = {
        0: 'segunda-feira',
        1: 'terça-feira',
        2: 'quarta-feira',
        3: 'quinta-feira',
        4: 'sexta-feira',
        5: 'sábado',
        6: 'domingo'
    }

    meses = {
        1: 'janeiro', 2: 'fevereiro', 3: 'março', 4: 'abril',
        5: 'maio', 6: 'junho', 7: 'julho', 8: 'agosto',
        9: 'setembro', 10: 'outubro', 11: 'novembro', 12: 'dezembro'
    }

    dia_semana = dias_semana[data_utc.weekday()]
    dia_numero = data_utc.day
    mes_nome = meses[data_utc.month]
    hora_formatada = data_utc.strftime('%H:%M')

    if mesma_data:
        return f"Hoje, {dia_numero} de {mes_nome} às {hora_formatada}"
    else:
        return f"{dia_semana}, {dia_numero} de {mes_nome} às {hora_formatada}"
