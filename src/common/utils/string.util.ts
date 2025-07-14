import slugify from 'slugify';
export const slugString = (str: string)=>{
    return slugify(str, {
        lower: true,       // chữ thường
        strict: true
    })
}