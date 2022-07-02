var mangNhanVien = [];
function renderTableNhanVien(arrNhanVien){
    //input: arrNhanVien
    //output: html: string
    var html = '';
    for(var i = 0; i < arrNhanVien.length; i++){
        var nv = arrNhanVien[i];
        if(!nv.hasOwnProperty('tinhTongLuong')){
            nv.tinhTongLuong = function(){
                var tongLuong = 0;
                if(this.chucVu == 'Sếp')
                    tongLuong = this.luongCoBan * 3;
                else if(this.chucVu == 'Trưởng phòng')
                    tongLuong = this.luongCoBan * 2;
                else    
                    tongLuong = this.luongCoBan;
                return tongLuong;
            }
        }
        if(!nv.hasOwnProperty('xepLoaiNhanVien')){
            nv.xepLoaiNhanVien = function(){
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
            }
        }
        var tr = `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tinhTongLuong()}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${i}')">Xóa</button>
                    <button class="btn btn-danger mt-2" onclick="xoaTheoTaiKhoanNhanVien('${nv.taiKhoan}')">Xóa TKNV</button>
                    <button class="btn btn-primary mt-2" onclick="suaNhanVien('${nv.taiKhoan}')">Sửa</button>
                </td>
            </tr>
        `;
        html += tr;
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
}
renderTableNhanVien(mangNhanVien);
document.querySelector('#btnThemNV').onclick = function(){
    //input: Nhan Vien
    var nv = new NhanVien();
    // lay thong tin nv
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    /*var ngayLam = new Date(document.querySelector('#datepicker').value);
    nv.ngayLam = ngayLam.toLocaleDateString();*/
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;
    //check
    var valid = true;

    valid &= kiemTraRong(nv.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nv.hoTen, '#tbTen', 'Họ tên nhân viên') & kiemTraRong(nv.email, '#tbEmail', 'Email') & kiemTraRong(nv.matKhau, '#tbMatKhau','Mật khẩu') & kiemTraRong(nv.luongCoBan, '#tbLuongCB','Lương cơ bản') & kiemTraRong(nv.gioLam, '#tbGiolam','Giờ làm') ;
    valid &= kiemTraDoDai(nv.taiKhoan,'#tbTKNV','Tài khoản',0,6) & kiemTraDoDai(nv.matKhau, '#tbMatKhau','Mật khẩu',6,10);
    //var ngayLamTest = moment(ngayLam).format('YYYY-MM-DD');
    valid &= kiemTraTatCaKyTu(nv.hoTen, '#tbTen', 'Họ tên nhân viên') & kiemTraTatCaSo(nv.taiKhoan,'#tbTKNV', 'Tài khoản') & kiemTraEmail(nv.email,'#tbEmail','Email') & kiemTraMatKhau(nv.matKhau, '#tbMatKhau','Mật khẩu') & kiemTraNgayThangNam(nv.ngayLam, '#tbNgay','Ngày làm') & kiemTraChucVu(nv.chucVu,'#tbChucVu');
    valid &= kiemTraGiaTri(nv.luongCoBan,'#tbLuongCB','Lương cơ bản',1000000,20000000) & kiemTraGiaTri(nv.gioLam,'#tbGiolam','Giờ làm',80,200);
    
    if(!valid)
        return;

    mangNhanVien.push(nv);
    renderTableNhanVien(mangNhanVien);
    var tMangNhanVien = JSON.stringify(mangNhanVien);
    luuLocalStorage('mangNhanVien', tMangNhanVien);
}
function suaNhanVien(nhanVienClick){
    for(var i = 0; i < mangNhanVien.length; i++){
        var nhanVien = mangNhanVien[i];
        if(nhanVienClick == nhanVien.taiKhoan){
            document.querySelector('#tknv').value = nhanVien.taiKhoan;
            document.querySelector('#name').value = nhanVien.hoTen;
            document.querySelector('#email').value = nhanVien.email;
            document.querySelector('#password').value = nhanVien.matKhau;
            document.querySelector('#datepicker').value = nhanVien.ngayLam;
            document.querySelector('#luongCB').value = nhanVien.luongCoBan;
            document.querySelector('#chucvu').value = nhanVien.chucVu;
            document.querySelector('#gioLam').value = nhanVien.gioLam;
            break;
        }
    }
}
document.querySelector('#btnCapNhat').onclick = function(){
    var nhanVienCapNhat = new NhanVien();
    nhanVienCapNhat.taiKhoan = document.querySelector('#tknv').value;
    nhanVienCapNhat.hoTen = document.querySelector('#name').value;
    nhanVienCapNhat.email = document.querySelector('#email').value;
    nhanVienCapNhat.matKhau = document.querySelector('#password').value;
    nhanVienCapNhat.ngayLam = document.querySelector('#datepicker').value;
    nhanVienCapNhat.luongCoBan = document.querySelector('#luongCB').value;
    nhanVienCapNhat.chucVu = document.querySelector('#chucvu').value;
    nhanVienCapNhat.gioLam = document.querySelector('#gioLam').value;
    for(var i = 0; i < mangNhanVien.length; i++){
        var nvMang = mangNhanVien[i];
        if(nvMang.taiKhoan == nhanVienCapNhat.taiKhoan){
            nvMang.hoTen = nhanVienCapNhat.hoTen;
            nvMang.email = nhanVienCapNhat.email;
            nvMang.matKhau = nhanVienCapNhat.matKhau;
            nvMang.ngayLam = nhanVienCapNhat.ngayLam;
            nvMang.luongCoBan = nhanVienCapNhat.luongCoBan;
            nvMang.chucVu = nhanVienCapNhat.chucVu;
            nvMang.gioLam = nhanVienCapNhat.gioLam;
            var valid = true;

            valid &= kiemTraRong(nvMang.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nvMang.hoTen, '#tbTen', 'Họ tên nhân viên') & kiemTraRong(nvMang.email, '#tbEmail', 'Email') & kiemTraRong(nvMang.matKhau, '#tbMatKhau','Mật khẩu') & kiemTraRong(nvMang.luongCoBan, '#tbLuongCB','Lương cơ bản') & kiemTraRong(nvMang.gioLam, '#tbGiolam','Giờ làm') ;
            valid &= kiemTraDoDai(nvMang.taiKhoan,'#tbTKNV','Tài khoản',0,6) & kiemTraDoDai(nvMang.matKhau, '#tbMatKhau','Mật khẩu',6,10);
            valid &= kiemTraTatCaKyTu(nvMang.hoTen, '#tbTen', 'Họ tên nhân viên') & kiemTraTatCaSo(nvMang.taiKhoan,'#tbTKNV', 'Tài khoản') & kiemTraEmail(nvMang.email,'#tbEmail','Email') & kiemTraMatKhau(nvMang.matKhau, '#tbMatKhau','Mật khẩu') & kiemTraNgayThangNam(nvMang.ngayLam, '#tbNgay','Ngày làm') & kiemTraChucVu(nvMang.chucVu,'#tbChucVu');
            valid &= kiemTraGiaTri(nvMang.luongCoBan,'#tbLuongCB','Lương cơ bản',1000000,20000000) & kiemTraGiaTri(nvMang.gioLam,'#tbGiolam','Giờ làm',80,200);
            
            if(!valid)
                return;
            renderTableNhanVien(mangNhanVien);
            break;
        }
    }
    var cMangNhanVien = JSON.stringify(mangNhanVien);
    luuLocalStorage('mangNhanVien',cMangNhanVien);
}
function xoaNhanVien(i){
    mangNhanVien.splice(i,1);
    renderTableNhanVien(mangNhanVien);
    var xMangNhanVien = JSON.stringify(mangNhanVien);
    luuLocalStorage('mangNhanVien', xMangNhanVien);
}
function xoaTheoTaiKhoanNhanVien(TKNV){
    var pos = -1;
    for(var i = mangNhanVien.length - 1; i >= 0; i--){
        var nhanVien = mangNhanVien[i];
        if(nhanVien.taiKhoan == TKNV){
            pos = i;
            break;
        }     
    }
    mangNhanVien.splice(pos,1);
    renderTableNhanVien(mangNhanVien);
    var nMangNhanVien = JSON.stringify(mangNhanVien);
    luuLocalStorage('mangNhanVien', nMangNhanVien);
}

document.querySelector('#btnTimNV').onclick = function(){
    var html = '';
    var key = document.querySelector('#searchName').value;
    for(var i = 0; i < mangNhanVien.length; i++){
        var nv = mangNhanVien[i];
        if(nv.chucVu == "Nhân viên"){
            var loaiNV = nv.xepLoaiNhanVien();
            if(loaiNV == key){
                var tr = `
                    <tr>
                        <td>${nv.taiKhoan}</td>
                        <td>${nv.hoTen}</td>
                        <td>${nv.email}</td>
                        <td>${nv.ngayLam}</td>
                        <td>${nv.chucVu}</td>
                        <td>${nv.tinhTongLuong()}</td>
                        <td>${nv.xepLoaiNhanVien()}</td>
                    </tr>
                `;
                html += tr;
            }
        document.querySelector('#tableDanhSach').innerHTML = html;
        }
    }
}

function luuLocalStorage(key,value){
    localStorage.setItem(key,value);
}

function layLocalStorage(key){
    if(localStorage.getItem(key))
        return localStorage.getItem(key); 
    return undefined;
}

window.onload = function(){
    if(layLocalStorage('mangNhanVien')){
        mangNhanVien = JSON.parse(layLocalStorage('mangNhanVien'));
        renderTableNhanVien(mangNhanVien);
    }
}