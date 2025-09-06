import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class DataRepository {
  getData() {
    return this.generateBigJson(30);
  }

  private generateBigJson(targetMB: number) {
    const targetBytes = targetMB * 1024 * 1024;
    const items: any[] = [];
    let currentSize = 0;
    let i = 0;

    function estimateEntry() {
      const entry = {
        id: i + 1,
        name: `Item ${i + 1}`,
        value: Math.random() * 1000,
        timestamp: new Date().toISOString(),
      };
      return entry;
    }

    while (currentSize < targetBytes) {
      const entry = estimateEntry();
      const entryStr = JSON.stringify(entry);
      items.push(entry);
      currentSize += Buffer.byteLength(entryStr) + 1;
      i++;
    }

    const bigJson = { items };

    return bigJson;
  }
}
