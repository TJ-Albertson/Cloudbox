
fetch("/addShareEmail" ,{
    data: form[0],
    headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())

fetch("/removeShareEmail" ,{
    data: emails,
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())

fetch("/addBox" ,{
    data: emails,
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())

