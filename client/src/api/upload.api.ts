class UploadApi {
    private url: any = process.env.VUE_APP_ROOT_API;

    public getImage(folder: string) {
        if (folder == 'feature') {
            return this.url + '/website/features/';
        }
        else{
            return this.url;
        }
    }

}

export default new UploadApi();