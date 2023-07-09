<template>
    <main>
        <div id="alert-container"></div>
        <div>
    <div class="row">
      <div class="col-md-4" v-for="(website,counter) in websites" :key="counter">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ website.websitename }}</h5>
            <a href="{{website.siteurl}}" target="_blank">{{ website.siteurl }}</a>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Enter your email for Subscribe to this Site"  v-model="emailValues[website.id]">
                <br>
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" @click="subscribe(website.id)">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </main>
 
   
</template>

<script>
import {BASE_API_URL} from '../utils/api.js';
export default {

  data() {
    return {
        websites: [],
        emailValues: [],
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
              this.initEmailValues(); 
            })
      .catch(error => {
            console.error('Error fetching posts', error.response.data);
        // Handle error, e.g., show an error message
      });
    },
    initEmailValues() {
      // Initialize email values for each website
      this.websites.forEach(website => {
        this.emailValues[website.id] = '';
      });
    },
    getEmail(websiteId) {
      // Get the email value for a specific website
      return this.emailValues[websiteId];
    },
    
    subscribe(websiteId) {
      // Make API request to subscribe
      const email = this.emailValues[websiteId];
      console.log('Subscribe to website ID:', websiteId);
      console.log('Email:', email);
      const requestOptions = {
               method: "POST",
               headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email_address: email })
           };

        fetch(`${BASE_API_URL}/website/${websiteId}/subscribe`, requestOptions)
        .then(response => {
              if (!response.ok) {
                    throw new Error('You have already Subscribed');            }
                  return response.json();
           })
          .then(data => {
            this.initEmailValues(); 
            this.showAlert('success',data);
          }).catch(error => {
            this.showAlert('danger', error.message);
       
      });
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

      // Add your subscription logic here
    
  },
  mounted() {
   this.getData();
    
  },
};
</script>