export default function imageValidators(e) {
    var { files } = e.target
    if (files.length === 1) {
        let file = files[0]
        if (file.size > 1048576)
            return "Pic size is more then 1 MB Please Upload pic upto 1 mb"
        else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif")
            return ""
        else
            return "Invalid Pic"
    }
    else {
        let error = []
        for (let index in Array.from(files)) {
            let file = files[index]
            if (file.size > 1048576)
                error.push(`Pic${parseInt(index) + 1} size is more then 1 MB Please Upload pic upto 1 mb`)
            else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif"){}
            else
                error.push(`Invalid Pic${parseInt(index)+1}`)
        }
        return error.length?error.length:""
    }
}
