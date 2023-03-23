import { toast } from "react-toastify";

const handleBlock = (id, member) => {
        const url = `https://hero-rider-server-nine.vercel.app/block/${id}`;
        fetch(url, {
                method: 'PUT',
                headers: {
                        'content-type': 'application/json',

                },
                body: JSON.stringify(member)
        })
                .then(res => res.json())
                .then(data => {
                        if (data.matchedCount > 0) {
                                toast.warning(`Blocked ${member.name}`)
                        }
                })
}

export default handleBlock;