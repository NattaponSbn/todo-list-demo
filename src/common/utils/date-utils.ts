import { format, parse, parseISO } from "date-fns";
import { DateFormatEnumConst } from "../enum/date-format.const";


export default class DateUtils {
    static formatDate(date: Date): string {
        if (!date) {
            return '';
        }
        const dateString = date.toISOString();
        const parsedDate = parseISO(dateString);
        const formattedDate = format(parsedDate, DateFormatEnumConst.dd_MM_yyyy);
        return formattedDate;
    }
    
    static formatDateTime(date: string, field: string = ''): string {
        if (!date) {
            return '';
        }

        if (date === '-') {
            return '-';
        }

        const parsedDate = parseISO(date);

        const formattedDate = format(parsedDate, DateFormatEnumConst.dd_MM_yyyy_HH_MM);
        return formattedDate;
    }

    static formatDateTime2(date: Date): string {
        if (!date) {
            return '';
        }
        const dateString = date.toISOString();
        const parsedDate = parseISO(dateString);
        const formattedDate = format(parsedDate, DateFormatEnumConst.dd_MM_yyyy_HH_MM);
        return formattedDate;
    }

    static formatDateStr(date: string | undefined | null): string {
        if (!date) {
            return '';
        }

        if (date === '-') {
            return '-';
        }

        const parsedDate = parseISO(date);
        const formattedDate = format(parsedDate, DateFormatEnumConst.dd_MM_yyyy);

        return formattedDate;
    }
    static formatDateTimeStr(date: string | undefined | null): string {
        if (!date) {
            return '';
        }

        if (date === '-') {
            return '-';
        }

        const parsedDate = parseISO(date);
        const formattedDate = format(parsedDate, DateFormatEnumConst.dd_MM_yyyy_HH_mm_ss);

        return formattedDate;
    }

    static formatDateSend(date: Date): string {
        if (!date) {
            return '';
        }
        const dateString = date.toISOString();
        const parsedDate = parseISO(dateString);
        const formattedDate = format(parsedDate, DateFormatEnumConst.yyyy__MM__dd);
        return formattedDate;
    }

    static formatDateTimeSendStr(date: string): string {
        if (!date) {
            return '';
        }

        if (date === '-') {
            return '-';
        }

        const parsedDate = parseISO(date);
        const formattedDate = format(parsedDate, DateFormatEnumConst.yyyy__MM__dd_HH_MM);

        return formattedDate;
    }

    static formatDateSendStr(date: string): string {
        if (!date || date === '-') {
            return date || '';
        }
    
        // Step 1: แปลงจาก dd/MM/yyyy ไปเป็น Date object
        const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
    
        // Step 2: แปลง Date object ไปเป็น ISO string
        const isoDate = parsedDate.toISOString(); // เช่น "2025-04-24T00:00:00.000Z"
        
        return isoDate;
    }


    static convertDateFormat(inputDate: string): string {
        if (!inputDate || inputDate === '') return '';
        if (inputDate.includes('-')) {
            return DateUtils.formatDateSendStr(inputDate);
        }

        // Split the input date string into date and time components
        const parts = inputDate.split(' ');
        const dateParts = parts[0].split('/');
        const timePart = parts[1] ?? '00:00';

        // Reorder the date components to yyyy-mm-dd format
        const formattedDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];

        // Concatenate the formatted date and time
        const formattedDateTime = formattedDate + ' ' + timePart;
        return formattedDateTime;
    }



   
}
