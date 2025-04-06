import FormDataPost from "@/components/organisms/form-data-post";
import Hero from "@/components/organisms/hero";

export default function EditSeratusHariKerja() {
    return (
        <>
            <Hero
                title="Edit Postingan Seratus Hari Kerja"
                description="Halaman ini digunakan untuk mengubah postingan Seratus Hari Kerja."
                isWebTitle={false}
            />
            <div className="py-6">
                <FormDataPost />
            </div>
        </>
    )
}