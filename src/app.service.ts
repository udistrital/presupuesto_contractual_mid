import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  counter: number = 0;

  getHello() {
    try {
      return {
        status: "ok",
        checkCount: this.counter++
      };
    } catch (error) {
        return {
            status: "error",
            error: error.message
        };
    }
  }
}
