import Hero from "@/components/organisms/hero";

export default function ViewPost() {
    return (
        <>
			<Hero
                title="Program Unggulan Pemda Kuningan"
                description="John Doe • 12 Januari 2025"
                isWebTitle={false}
            />

			<div className="flex flex-col h-full w-full items-center">
				<div className="md:px-4.5 dark:divide-washed-dark h-full w-full max-w-screen-2xl px-3 lg:px-6">
                    <div className="flex items-center justify-center py-10">
                        <div className="w-9/12 max-md:w-full">
                            <p className="text-base/5 text-justify">
                            KUNINGAN – Ratusan warga Desa Padarek di Kecamatan Kuningan antusias menghampiri Balai Desa untuk membeli berbagai keperluan bahan pokok. Kegiatan ini merupakan bagian dari program 100 hari kerja pertama Bupati dan Wakil Bupati Kuningan, untuk memastikan ketersediaan bahan pokok dapat diterima warga dengan harga terjangkau, terlebih dalam menghadapi Hari Raya Idul Fitri 1446 Hijriah.

                            <br/><br/>Wakil Bupati Kuningan, Tuti Andriani, SH., Mkn hadir pada kesempatan tersebut, Jumat (21/03/2025). Program bertajuk Padaringan (Penjualan Bahan Pangan Dalam Rangka Pengendalian Inflasi Di Kabupaten Kuningan) itu juga telah menjangkau belasan desa di seluruh pelosok Kabupaten Kuningan. 

                            <br/><br/>“Apresiasi kepada Dinas Ketahanan Pangan dan Pertanian yang menggagas kegiatan GPM sebagai bentuk dukungan program 100 hari kerja pertama, dimana kami berkomitmen meningkatkan kesejahteraan masyarakat, khususnya dalam sektor ketahanan pangan” Ujar Wabup Tuti dalam sambutannya. Wabup Tuti menyebutkan bahwa dengan adanya kegiatan seperti ini diharapkan mampu memulihkan perekonomian, karena bisa meningkatkan daya beli masyarakat.

                            <br/><br/>“Terlebih menjelang Hari Raya Idul Fitri dimana harga-harga bisa melonjak tinggi. Dengan adanya gerakan pangan murah ini kita harapkan daya beli masyarakat terdongkrang sehingga membawa dampak pemulihan perekonomian di Kabupaten Kuningan. Dan saya mohon agar tolong nanti jangan berebut, ikuti secara budaya antri” Pinta Wabup Tuti.

                            <br/><br/>Sementara itu, Kepala Desa Padarek, sebagai perwakilan masyarakat mengucapkan terimakasih kepada pemerintah daerah karena masyarakat bisa membeli bahan pokok dengan harga yang terjangkau.

                            <br/><br/>“Alhamdulilah masyarakat begitu antusias. Kami ucapkan terimakasih kepada Ibu Wakil Bupati dan jajaran pemerintah daerah atas kegiatan Gerakan Pangan Murah ini. Semoga ke depan akan ada lagi acara-acara yang sama yang tujuannya untuk meningkatkan kesejahteraan masyarakat” pungkasnya.
                            Adapun GPM Padaringan ini menyediakan berbagai kebutuhan pokok seperti beras, minyak goreng, terigu dan gula pasir. (BagProkompim/SetdaKuningan)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}