<template>
  <div>
    <h1 class="text-center">This is Post Page</h1>
    <main class="d-flex justify-content-center align-items-center">
      <form @submit.prevent="submitPost" class="w-50">
        <div class="form-group">
          <label for="postTitle" style="font-weight: bold;">Post Title</label>
          <input type="text" class="form-control" id="postTitle" v-model="postTitle" placeholder="Enter post title">
        </div>
        <div class="form-group">
          <label for="postDescription" style="font-weight: bold;">Post Description</label>
          <textarea class="form-control" id="postDescription" rows="4" v-model="postDescription" placeholder="Enter post description"></textarea>
        </div>
        <div class="form-group">
          <label for="websiteSelect" style="font-weight: bold;">Select Website</label>
          <select class="form-control" v-model="websiteSelect" id="websiteSelect">
            <option value="">Select Option</option>
            <option v-for="website in websites" :value="website.id">{{ website.websitename }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="authorName" style="font-weight: bold;">Author Name</label>
          <input v-model="authorName" type="text" class="form-control" id="authorName" placeholder="Enter author name">
        </div>
        <div class="form-group">
          <label for="publishDate" style="font-weight: bold;">Publish Date</label>
          <input v-model="publishDate" type="date" class="form-control" id="publishDate">
        </div>
        <div class="form-group">
          <label for="imageUpload" style="font-weight: bold;">Upload Image</label>
          <input type="file" class="form-control-file" id="imageUpload" @change="handleImageUpload" accept="image/*">
        </div>
        <div class="mt-3"> <!-- Add margin-top to create space -->
          <button type="submit" class="btn btn-primary">Submit Post</button>
        </div>
      </form>
           
        
    </main>
    <div id="alert-container"></div>
  </div>
</template>


<script>
import {BASE_API_URL} from '../utils/api.js';
export default {
  data() {
    return {
        websites:[],
      postTitle: '',
      postDescription: '',
      websiteSelect: 'website1',
      authorName: '',
      publishDate: '',
      imageUpload: null,
     
    };
  },
  methods: {
    getData() {
        fetch(`${BASE_API_URL}/websites`)
       .then(response => {
             if (!response.ok) {
              throw new Error('Error fetching posts');
             }
              return response.json();
           })
          .then(data => {
              this.websites = data;
             
            })
      .catch(error => {
            console.error('Error fetching posts', error.response.data);
        // Handle error, e.g., show an error message
      });
    },
    submitPost() {
      

      const formData = new FormData();
      formData.append('postTitle', this.postTitle);
      formData.append('postDescription', this.postDescription);
      formData.append('websiteSelect', this.websiteSelect);
      formData.append('authorName', this.authorName);
      formData.append('publishDate', this.publishDate);
      formData.append('imageUpload', this.imageUpload);

      fetch(`${BASE_API_URL}/createpost`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          this.clearFields();
          this.showAlert('success',data);
          // Handle the response data
        })
        .catch(error => {
          console.error('Error submitting post', error);
          // Handle the error
        });
    },
    handleImageUpload(event) {
      this.imageUpload = event.target.files[0];
      
    },

    clearFields(){
         this.postTitle='';
         this.postDescription='';
         this.websiteSelect='website1';
         this.authorName= '';
         this.publishDate= '';
        this.imageUpload= null
    },

    showAlert(type, message) {
  // Show Bootstrap alert dynamically
     const alertElement = document.createElement('div');
      alertElement.classList.add('alert', `alert-${type}`);
      alertElement.textContent = message;

  // Add the alert to the DOM
      const alertContainer = document.getElementById('alert-container');
     alertContainer.appendChild(alertElement);

  // Automatically remove the alert after a certain time
  setTimeout(() => {
    alertContainer.removeChild(alertElement);
  }, 3000);
}
  },

  mounted(){
    this.getData();
  }
};
</script>