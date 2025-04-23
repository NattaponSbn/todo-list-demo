import { format, parseISO } from "date-fns";
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

    static formatDateSendStr(date: string): string {
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

   
}
