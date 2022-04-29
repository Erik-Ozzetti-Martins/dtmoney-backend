import dayjs from 'dayjs';

class DateJs {
  dateNow(): Date {
    return dayjs().toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DateJs };
