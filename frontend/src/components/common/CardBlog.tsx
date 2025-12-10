import Image from "next/image"

export default function CardBlog({ img_url, title, url }) {
    return (
        <div className="flex flex-col bg-white/1 backdrop-blur-sm border border-white/20 max-w-xs items-center p-5 rounded-lg space-y-5 hover:scale-105 hover:underline">
            <Image
                src={img_url}
                alt=""
                width={250}
                height={200}
                className="rounded-md mt-[-100px]"
            />

            <a href={url} className="text-center text-white lg:text-xl ">{title}</a>
        </div>
    )
}
