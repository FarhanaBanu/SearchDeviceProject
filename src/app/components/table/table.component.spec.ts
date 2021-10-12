import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { DeviceTable } from 'src/app/models/device-table.model';
import { Device } from 'src/app/models/device.model';
import { DemoMaterialModule } from 'src/app/modules/material.module';
import { DeviceService } from 'src/app/services/device.service';
import { TableComponent } from './table.component';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const devicesFixture: Device[] = [
    {
      device_category: 'Wand',
      group: 'Unicorn Hair',
      model: 'Ash',
      person: 'Cedric Diggory'
    },
    {
      device_category: 'Wand',
      group: 'Pheonix Feather',
      model: 'Holly',
      person: 'Harry Potter'
    },
    {
      device_category: 'Wand',
      group: 'Thestral Hair',
      model: 'Elder wood',
      person: 'Albus Dumbledore'
    }
  ];

  const devicesTableFixture: DeviceTable = {
    collection_entries: devicesFixture.length,
    headers: [
      'model',
      'group',
      'device_category',
      'person'
    ],
    id: 'devices',
    rows: devicesFixture,
    title: 'Devices'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        DemoMaterialModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set deviceTable to response from service', () => {
      component.deviceTable = null;
      component.ngOnInit();      
      // const service = fixture.debugElement.injector.get(DeviceService);
      // let spy_getPosts = spyOn(service,"getAll").and.callFake(() => {
      //   return Rx.of(devicesTableFixture);
      // });
      // component.setupTable();
      // tick(500);
      expect(component.deviceTable).toEqual(devicesTableFixture)

    });
  });
});
