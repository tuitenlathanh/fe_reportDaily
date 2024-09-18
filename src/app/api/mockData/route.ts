import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export  async function GET() {
    const mockData = {
      users: [
        { UserCode: 'SC117', Name: 'Phạm Hoàng Phương Thảo' },
        { UserCode: 'SC171', Name: 'Đỗ Tuấn Kiệt' },
        { UserCode: 'SC224', Name: 'Nguyễn Thị Kim Phượng' },
        { UserCode: 'SC242', Name: 'Lê Hùng Cường' },
        { UserCode: 'SC205', Name: 'Huỳnh Thị Kim Phượng' },

      ],  
      workGroups: [
        { Id: 1, GroupFullname: 'FILM & FUJI' },
        { Id: 2, GroupFullname: 'BARA' },
        { Id: 3, GroupFullname: 'QA - FQA - STAMP' },
        { Id: 4, GroupFullname: 'CAMERA - ALBUM PRO - CAMERA' },
        { Id: 5, GroupFullname: 'KHÁC' },
        { Id: 6, GroupFullname: 'KHO' },
      ],
       works: [
        { Id: 1, WorkGroup: 1, WorkID: 10, WorkName: 'SL STANDARD' },
        { Id: 2, WorkGroup: 1, WorkID: 11, WorkName: 'SL PRO' },
        { Id: 3, WorkGroup: 1, WorkID: 12, WorkName: 'BU STANDARD' },
        { Id: 4, WorkGroup: 1, WorkID: 13, WorkName: 'BU PRO' },
        { Id: 5, WorkGroup: 1, WorkID: 15, WorkName: 'MA - FT - PF STANDARD' },
        { Id: 6, WorkGroup: 1, WorkID: 16, WorkName: 'MA - FT - PF PRO' },
        { Id: 7, WorkGroup: 1, WorkID: 18, WorkName: 'SL FUJI' },
        { Id: 8, WorkGroup: 1, WorkID: 19, WorkName: 'MA & FT & PF (STANDARD) FUJI' },
        { Id: 9, WorkGroup: 1, WorkID: 21, WorkName: 'BU FUJI' },
        { Id: 10, WorkGroup: 1, WorkID: 28, WorkName: 'AP FUJI' },
        { Id: 11, WorkGroup: 1, WorkID: 39, WorkName: 'AP STANDARD' },
        { Id: 12, WorkGroup: 1, WorkID: 40, WorkName: 'AP PRO' },
        { Id: 13, WorkGroup: 1, WorkID: 41, WorkName: 'MA & FT & PF (PRO) FUJI' },
        {Id: 14, WorkGroup: 2,  WorkID: 4, WorkName: 'BA/PK STANDARD' },
        {Id: 15, WorkGroup: 2,  WorkID: 5, WorkName: 'BA/PK PRO' },
        {Id: 16, WorkGroup: 2,  WorkID: 8, WorkName: 'BA ST' },
        {Id: 17, WorkGroup: 2,  WorkID: 9, WorkName: 'BA BU'}, 
        {Id: 18, WorkGroup: 3,  WorkID: 23, WorkName: 'STAMP' },
        {Id: 19, WorkGroup: 3,  WorkID: 24, WorkName: 'QA' },
        {Id: 20, WorkGroup: 3,  WorkID: 25, WorkName: 'FQA'}, 
        {Id: 21, WorkGroup: 4,  WorkID: 1, WorkName: 'AL PRO' },
        {Id: 22, WorkGroup: 4,  WorkID: 2, WorkName: 'CAMERA' },
        {Id: 23, WorkGroup: 4,  WorkID: 3, WorkName: 'ALCUT'},
        
        {Id: 24, WorkGroup: 6,  WorkID: 26, WorkName: 'IMEX (XUẤT/NHẬP)' },
        {Id: 25, WorkGroup: 6,  WorkID: 29, WorkName: 'PK IN' },
        {Id: 26, WorkGroup: 6,  WorkID: 30, WorkName: 'PK OUT'}, 
        {Id: 27, WorkGroup: 6,  WorkID: 31, WorkName: 'PACKING' },
        {Id: 28, WorkGroup: 6,  WorkID: 32, WorkName: 'DU AN 1' },
        {Id: 29, WorkGroup: 6,  WorkID: 33, WorkName: 'DU AN 2'}, 
        {Id: 33, WorkGroup: 6,  WorkID: 34, WorkName: 'DU AN 3'}, 
        {Id: 34, WorkGroup: 6,  WorkID: 35, WorkName: 'MITSUMORI' },
        {Id: 36, WorkGroup: 6,  WorkID: 37, WorkName: 'FUJI MITSUMORI'}, 
        {Id: 37, WorkGroup: 5, WorkID: 27, WorkName: 'Khác' }
      ],
      workTime: [
        { Id: 1, hour: 1, minute: 60  },
        { Id: 2, hour: 2, minute: 120 },
        { Id: 3, hour: 3, minute: 180 },
        { Id: 4, hour: 4, minute: 240 },
        { Id: 5, hour: 5, minute: 300 },
        { Id: 6, hour: 6, minute: 360 },
        { Id: 7, hour: 7, minute: 420 },
        { Id: 8, hour: 8, minute: 480 },
        { Id: 9, hour: 9, minute: 540 },
        { Id: 10, hour: 10, minute: 600 },
        { Id: 11, hour: 11, minute: 660 },
        { Id: 12, hour: 12, minute: 720 },
      ]
    };
  
    return NextResponse.json(mockData);
  }
  