class UploadApi {
    private url: any = process.env.VUE_APP_ROOT_API;

    public getImage(folder: string) {
        if (folder == 'feature') {
            return this.url + '/website/features/';
        }
        else if (folder == 'user') {
            return this.url + '/website/user/';
        }
        else{
            return this.url;
        }
    }

}

export default new UploadApi();