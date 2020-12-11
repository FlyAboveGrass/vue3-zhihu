import $message from '../message/createMessage'

interface CheckCondition {
    // 以何种格式进行文件上传格式验证
    format?: string[];
    size?: number;
}

const checkUploadFile = (file: File, condition: CheckCondition) => {
    if(condition.size && file.size > condition.size * 1024 * 1024) {
        $message(`上传文件大小不能超过${condition.size}M`, 'danger')
        return false;
    }
    if(!condition.format?.includes(file.type)){
        $message(`文件格式不支持`, 'danger')
        return false;
    }
    return true
}

export default checkUploadFile