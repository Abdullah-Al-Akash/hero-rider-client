import { toast } from "react-toastify";

const handleActive = (id, member) => {
        const url = `http://localhost:5000/member/${id}`;
        fetch(url, {
                method: 'PUT',
                headers: {
                        'content-type': 'application/json'
                },
                body: JSON.stringify(member)
        })
                .then(res => res.json())
                .then(data => {
                        if (data.matchedCount > 0) {
                                toast.success(`Successfully Active${member.name}`)
                        }
                })
}

export default handleActive;