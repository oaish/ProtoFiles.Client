import Image from "next/image";

export default function NotFound() {
    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image src="/images/404.png" alt="404 Not Found" width={400} height={400} />
        </div>
    )
}