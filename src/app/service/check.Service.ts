import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckService {
    messages = {
        error: false,
        errorMessages: ''
    };
    constructor() {}
    // 判断是否有特殊字符
    public SpecialCharacters(data: string) {
        if (!data.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')) {
            this.messages.error = true;
            this.messages.errorMessages = '用户名不能有特殊字符';
            return this.messages;
        }
    }
    // 判断是否是这个长度
    public checkLength(data: string) {
        if (data.length < 2 || data.length > 10) {
            this.messages.error = true;
            this.messages.errorMessages = '用户名长度应该再2~10';
            return this.messages;
        }
    }
    public noNull(data: string) {
        if (data === '') {
            this.messages.error = true;
            this.messages.errorMessages = '用户名为空';
            return this.messages;
        }
    }
}
