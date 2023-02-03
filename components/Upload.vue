<template>
  <div>
    <div class="dropbox">
      <input
        type="file"
        class="input-file"
        name="photos"
        accept="image/*"
        @change="filesChange"
      />
    </div>
    <div>
      <p v-if="imgPreview">
        <v-img max-width="80" max-height="80" contain :src="imgPreview" />
        <v-btn @click="remove">Remove</v-btn>
      </p>
      <p>Error</p>
    </div>
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression'
import Rotator from 'exif-auto-rotate'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
export default {
  name: 'UploadComponent',
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      imgUpload: null,
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
    imgPreview() {
      if (this.imgUpload) {
        return this.imgUpload
      } else {
        return null
      }
    },
  },
  watch: {
    previewUrl(val) {
      if (val) {
        this.currentStatus = STATUS_SUCCESS
      } else {
        this.currentStatus = STATUS_INITIAL
      }
    },
  },
  methods: {
    async compressImage(file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, options)

      return compressedFile
    },
    async urlToFile(url, filename, mimeType) {
      const res = await fetch(url)
      const buf = await res.arrayBuffer()
      return new File([buf], filename, { type: mimeType })
    },
    async filesChange(event) {
      let imageRotate = null
      let file = null
      try {
        console.log(event)
        imageRotate = await Rotator.createRotatedImageAsync(
          event.target.files[0],
          event.target.files[0].type
        )
        file = await this.urlToFile(
          imageRotate,
          event.target.files[0].name,
          event.target.files[0].type
        )
      } catch (e) {
        file = event.target.files[0]
      }
      // this.previewImageRotate = imageRotate

      this.currentStatus = STATUS_SAVING
      // const file = event.target.files[0]
      if (!file) {
        return false
      }
      if (!file.type.match('image.*')) {
        return false
      }
      const filesize = file.size / (1024 * 1024)
      if (filesize >= 10) {
        this.uploadError = 'ใบเสร็จจะต้องมีขนาดไฟล์ไม่เกิน 10 MB'
        this.currentStatus = STATUS_FAILED
        return false
      }

      try {
        const compressedFile = await this.compressImage(file)
        const reader = new FileReader()
        const that = this
        reader.readAsDataURL(compressedFile)
        reader.onloadend = function () {
          that.imgUpload = reader.result
          that.currentStatus = STATUS_SUCCESS
          that.$emit('input', reader.result)
          that.$emit('changed')
        }
      } catch (error) {}
    },
    remove() {
      this.imgUpload = null
    },
  },
}
</script>

<style lang="scss" scoped>
.input-file {
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  z-index: 10;
}
.dropbox {
  // background: #dedede;
  background-image: linear-gradient(180deg, #3b8af7, #2971d6);
  box-shadow: 0 3px 6px #00000040;
  position: relative;
  z-index: 1;
  height: 60px;
  border-radius: 4px;
  // cursor: pointer;
}
</style>
