<template>
    <div>
        <v-sheet :color="website.color.main">
            <v-container style="padding: 40px 0px">
                <h2 class="white--text">
                    Tự học lập trình trực tuyến. Hãy bắt đầu với khoá học đầu tiên của bạn!
                </h2>
                <v-text-field solo class="mt-5" placeholder="Nhập nội dung tìm kiếm" style="width: 400px;"
                    append-icon="mdi-magnify" clearable></v-text-field>
            </v-container>
        </v-sheet>
        <v-sheet class="mt-5" style="height: 1000px;">
            <v-container>
                <div v-for="item in courseCatalogs" :key="item._id" class="mt-10">
                    <h2>{{ item.name }}</h2>

                    <v-row class="mt-1">
                        <v-col cols="12" md="4" lg="3" v-for="course in item.courses" :key="course._id">
                            <v-hover v-slot="{ hover }">
                                <v-card class="w-100">
                                    <v-img :aspect-ratio="16 / 9" :src="course.image_url.filename">
                                        <v-expand-transition>
                                            <div v-if="hover"
                                                class="d-flex transition-fast-in-fast-out teal darken-2 v-card--reveal  white--text"
                                                style="height: 100%;">
                                                <div class="pa-2">
                                                    <div>
                                                        <v-icon color="white">mdi-earth</v-icon>
                                                        <span class="ml-2">{{ course.isActive ? 'Đang mở' : 'Đã đóng'}}</span>
                                                    </div>
                                                    <div>
                                                        <v-icon color="white">mdi-account-group</v-icon>
                                                        <span class="ml-2"> {{ course.learning_count }} học viên</span>
                                                    </div>
                                                    <div>
                                                        <v-icon color="white">mdi-star</v-icon>
                                                        <span class="ml-2"><b>{{ course.rating_count }}</b> đánh giá
                                                            tuyệt
                                                            vời từ học
                                                            viên</span>
                                                    </div>
                                                    <div>
                                                        <v-icon color="white">mdi-clock</v-icon>
                                                        <span class="ml-2">Tổng thời gian học:
                                                            <b>{{ course.school_hours_number }}
                                                                {{ course.school_hours_type }}</b></span>
                                                    </div>
                                                    <div>
                                                        <v-icon color="white">mdi-medal</v-icon>
                                                        <span class="ml-2">{{ course.isCertification ? 'Giấy chứng nhận  sau khi hoàn thành' : 'Không có giấy chứng nhận'}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-expand-transition>
                                    </v-img>
                                    <v-card-text class="pt-6" style="position: relative;">
                                        <v-btn absolute :color="website.color.main" class="white--text" fab large right
                                            top>
                                            <v-icon>mdi-school-outline</v-icon>
                                        </v-btn>
                                        <div style="height: 220px">
                                            <div>
                                                <v-rating v-model="course.rating" color="yellow darken-3"
                                                    style="margin-left: -10px;" size="18"
                                                    background-color="grey darken-1" empty-icon="$ratingFull"
                                                    half-increments hover></v-rating>
                                            </div>
                                            <h3 class="text-h5 font-weight-bold cyan--text text--darken-4 mb-2">
                                                {{ course.name }}
                                            </h3>
                                            <div>
                                                <h3 class="text--secondary">Tác giả: {{ course.author.profile_name }}
                                                </h3>
                                            </div>
                                            <div class="mt-3 mb-2">
                                                {{ course.description }}...
                                            </div>
                                        </div>
                                        
                                            <v-divider></v-divider>
                                            <h3 class="mt-2">{{ course.coin == 0 ? 'MIỄN PHÍ' : course.coin + ' coin' }}
                                            </h3>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Learning',
    props: ['website', 'user', 'onResize'],
    components: {

    },
    watch: {
        user() {
            if (!this.user) {
                this.$router.push({ name: 'home' })
            }
        }
    },
    data() {
        return {
            courseCatalogs: [
                {
                    _id: 1,
                    name: 'Kiến thức cơ sở',
                    courses: [
                        {
                            _id: 1,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/fa2bdb40f4e449dca4514de8c8bca52d.jpg'
                            },
                            name: 'Lập trình hướng đối tượng trong C++',
                            description: 'Lập trình hướng đối tượng (Object-Oriented-Programming) là phương pháp lập trình dựa',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 2,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/c6b8d5cfe9ff4b56887e8751d37a1c61.png'
                            },
                            name: 'Truyền thông và Mạng máy tính',
                            description: 'Khóa học cung cấp cho lập trình viên những kiến thức cơ bản và dễ hiểu về mạng máy',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 3,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/ec5c9eda632842eb9ad3146b4521e11a.png'
                            },
                            name: 'Phần mềm máy tính',
                            description: 'Phần mềm luôn là công cụ cần thiết trong mọi lĩnh vực, khóa học này sẽ giúp bạn hiểu',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 4,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/3f924049f9af4f95b0fd406b8baebe52.png'
                            },
                            name: 'Phần cứng máy tính',
                            description: 'Khóa học này tập trung vào việc cung cấp các kiến thức chung về các bộ phận của',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        }
                    ]
                },
                {
                    _id: 2,
                    name: 'Lập trình cơ sở',
                    courses: [
                        {
                            _id: 1,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/eab2e064afab4d8aa5f0b0d408cef9e0.jpg'
                            },
                            name: 'C cho người mới bắt đầu',
                            description: 'Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ cung cấp những kiến thức',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 2,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/bf4dca390c5742bda4dbf6344e859eb9.jpg'
                            },
                            name: 'C++ cho người mới bắt đầu',
                            description: 'Khóa học lập trình C++ cơ bản cho người mới bắt đầu. Khóa học này sẽ cung cấp',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 3,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/adbef92753d242bcb79ca8f74cd615a5.jpg'
                            },
                            name: 'Làm quen với SQL',
                            description: 'Khóa học này sẽ giúp các lập trình viên nắm được nguyên tắc, cú pháp và cách thức hoạt',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 4,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/8c4eed15a33744e996461692464ebc7f.jpg'
                            },
                            name: 'JavaScript cơ bản',
                            description: 'Giúp học viên nắm vững các nguyên tắc và cú pháp cơ bản trong Javascript - ngôn ngữ',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 5,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/cf55489ccd434e8c81c61e6fffc9433f.jpg'
                            },
                            name: 'Python cơ bản',
                            description: 'Khóa học lập trình Python cơ bản với các bài tập và lý thuyết dễ hiểu, học xong bạn có',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 6,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/3aa5f5e3e4cb4cb381288840a93c99eb.jpg'
                            },
                            name: 'C# cơ bản',
                            description: 'Khóa học lập trình C# kèm thực hành, khóa học sẽ giúp bạn làm quen với lập trình cũn',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 7,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/1e746fe3cbe448bda850d8b953a78954.jpg'
                            },
                            name: 'Java cơ bản',
                            description: 'Khóa học lập trình Java cơ bản cho người mới bắt đầu, khóa học này sẽ là nền tảng',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        }
                    ]
                },
                {
                    _id: 3,
                    name: 'Lập trình nâng cao',
                    courses: [
                        {
                            _id: 1,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/39d6cf7a07b94a0991fe3e68641417b4.jpg'
                            },
                            name: 'Thực hành với SQL',
                            description: 'Khóa học này sẽ giúp bạn biết về một số chức năng chính cần thiết để sắp xếp, lọc và',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 2,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/e0a85ff6c0c64720ad582bdec3741cd1.jpg'
                            },
                            name: 'Cấu trúc dữ liệu và giải thuật',
                            description: 'Khóa học này sẽ giúp các bạn hiểu thuật toán cũng như hiểu rõ bản chất của các cấu',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 3,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/00e74493b80d4dcfadf2e1a59af577e7.jpg'
                            },
                            name: 'Lập trình hướng đối tượng trong java',
                            description: 'Lập trình hướng đối tượng (Object-Oriented-Programming) là phương pháp lập trình dựa trên đối tượng để tìm ra bản chất của vấn',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 4,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/37a8e25c3ada4cb0bc3b0b32a36881fe.jpg'
                            },
                            name: 'C++ nâng cao',
                            description: 'Khóa học lập trình C++ nâng cao sẽ giúp bạn hiểu sâu hơn về C++ với một số khái',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        }
                    ]
                },
                {
                    _id: 3,
                    name: 'Giải quyết vấn đề',
                    courses: [
                        {
                            _id: 1,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/8396de4f1f30479aac948a0ac0ca22da.jpg'
                            },
                            name: 'Thuật toán nâng cao',
                            description: 'Giúp lập trình viên cải thiện khả năng lập trình với những thuật toán mạnh mẽ để giải',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 2,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/cd12e46d2f0b4f7ab40ed4bef9925043.jpg'
                            },
                            name: 'Thuật toán căn bản',
                            description: 'Với khóa học thuật toán cơ bản, bạn sẽ học được cách tư duy và giải quyết các bài toán',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                        {
                            _id: 3,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/7be5719f67c943288b0e601bc2f55fb6.jpg'
                            },
                            name: 'Thư viện chuẩn C++',
                            description: 'Thư viện chuẩn luôn là thứ không thể thiếu đối với một ngôn ngữ lập trình, khóa học này',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        }
                    ]
                },
                {
                    _id: 3,
                    name: 'Kỹ năng nâng cao',
                    courses: [
                        {
                            _id: 1,
                            image_url: {
                                filename: 'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/b7fa55b1f69c4852a59543c47d908229.jpg'
                            },
                            name: 'Điện toán đám mây',
                            description: 'Khóa học sẽ cung cấp cái nhìn cơ bản và tổng quan về lĩnh vực điện toán đám mây và',
                            author: {
                                profile_name: 'tanhuynh9940',
                                profile_photo: {
                                    filename: 'profile.png'
                                }
                            },
                            type_course: 1,
                            rating: 4,
                            learning_count: 7777,
                            rating_count: 160,
                            isCertification: true,
                            school_hours_type: 'giờ',
                            school_hours_number: 60,
                            isActive: true,
                            coin: 0
                        },
                    ]
                }
            ]
        }
    },
    methods: {

    }
})
</script>

<style scoped>
</style>
