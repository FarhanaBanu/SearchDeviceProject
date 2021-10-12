import { Component, OnInit } from '@angular/core';
import { DeviceTable } from 'src/app/models/device-table.model';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  deviceTable: DeviceTable;
  filteredDeviceTable: DeviceTable;
  inputData: any = "";

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.setupTable();
  }

   setupTable(): void {
    this.deviceService.getAll().subscribe((data: DeviceTable) => {
      this.deviceTable = data;
      this.filteredDeviceTable = JSON.parse(JSON.stringify(data));  
    });
  }

  searchModel() {
    this.filteredDeviceTable.rows = this.deviceTable.rows.filter(ele => {
    return ele.model.toLowerCase().includes(this.inputData.toLowerCase());
  })
  }
}
