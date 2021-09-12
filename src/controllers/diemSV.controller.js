const rp = require("request-promise");
const cheerio = require("cheerio");
const CaoDataDiemSinhVienEPU = async (req, res) => {
    const URL = "http://sinhvien.epu.edu.vn/XemDiem.aspx?k=DuFC3sq1yJ7CC1o96qNvXw";
    const options = {
        uri: URL,
        transform: (body) => cheerio.load(body)
    };
    try {
        var $ = await rp(options);
    } catch (error) {
        console.log('error', error)
        //return error;
    }

    // let ThongTinSinhVien = [];
    // let HoTen = $(".main-content  .title-group").text().trim();
    // console.log(HoTen)
    // ThongTinSinhVien.push({HoTen})
    // let Ttsv = $(".group-right tbody");
    // let TenMonHoc = item.find("td:nth-child(2)").text().trim();
    // let MaLop = item.find("td:nth-child(3)").text().trim();
    // let SoTinChi = item.find("td:nth-child(4)").text().trim();
    const ItemContent = $(".tblKetQuaHocTap .markRow");
    const Data = [];
    for (let i = 0; i < ItemContent.length; i++) {
        let item = $(ItemContent[i]);
        let TenMonHoc = item.find("td:nth-child(2)").text().trim();
        let MaLop = item.find("td:nth-child(3)").text().trim();
        let SoTinChi = item.find("td:nth-child(4)").text().trim();
        let DiemTBThanhPhan = item.find("td:nth-child(9)").text().trim();
        let DiemThi = item.find("td:nth-child(11)").text().trim();
        let DiemTongKet = item.find("td:nth-child(13)").text().trim();
        let XepLoai = item.find("td:nth-child(14)").text().trim();
        Data.push({TenMonHoc, MaLop, SoTinChi , DiemTBThanhPhan, DiemThi, DiemTongKet, XepLoai })
    }
    res.status(200).send({ success: true , Data});
};


const CaoDataLichHocSinhVienEPU = async (req, res) => {
    const URL = "http://sinhvien.epu.edu.vn/XemLichHoc.aspx?k=DuFC3sq1yJ7CC1o96qNvXw";
    const options = {
        uri: URL,
        transform: (body) => cheerio.load(body)
    };
    try {
        var $ = await rp(options);
    } catch (error) {
        console.log('error', error)
        //return error;
    }
   
    const ItemContent = $("#mainTbl tbody tr:nth-child(4) td input:nth-child(1)");
    ItemContent.attr("onclick")
    console.log(typeof ItemContent.attr("onclick"))
    res.status(200).send({ success: true });
};

module.exports = {
    CaoDataDiemSinhVienEPU, CaoDataLichHocSinhVienEPU
}