import FormDataPost from "@/components/organisms/form-data-post";
import Hero from "@/components/organisms/hero";

export default function AddSeratusHariKerja() {
    return (
        <>
            <Hero
                title="Input Postingan Seratus Hari Kerja"
                description="Halaman ini digunakan untuk menambahkan postingan Seratus Hari Kerja."
                isWebTitle={false}
            />
            <div className="py-6">
                <FormDataPost />
            </div>
        </>
    )
}