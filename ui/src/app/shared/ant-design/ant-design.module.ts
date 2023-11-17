import { NgModule } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  exports: [
    NzMessageModule,
    NzModalModule,
    NzCollapseModule,
    NzInputModule,
    NzUploadModule,
    NzDrawerModule,
    NzListModule,
    NzToolTipModule,
    NzSpinModule,
    NzLayoutModule,
    NzFormModule,
    NzDropDownModule,
    NzButtonModule,
    NzTableModule,
    NzNotificationModule,
    NzResizableModule,
    NzMenuModule,
    NzTypographyModule,
    NzTabsModule,
  ],
})
export class AntDesignModule {}
