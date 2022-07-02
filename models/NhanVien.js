function NhanVien(){
    this.taiKhoan = 0;
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.gioLam = 0;
    this.tinhTongLuong = function(){
        var tongLuong = 0;
        if(this.chucVu == 'Sếp')
            tongLuong = this.luongCoBan * 3;
        else if(this.chucVu == 'Trưởng phòng')
            tongLuong = this.luongCoBan * 2;
        else    
            tongLuong = this.luongCoBan;
        return tongLuong;
    };
    this.xepLoaiNhanVien = function(){
        var loaiNhanVien = '';
        if(this.gioLam >= 192)
            loaiNhanVien = 'Xuất sắc';
        else if(this.gioLam >= 176)
            loaiNhanVien = 'Giỏi';
        else if(this.gioLam >= 160)
            loaiNhanVien = 'Khá';
        else    
            loaiNhanVien = 'Trung bình';
        return loaiNhanVien;
    };
}