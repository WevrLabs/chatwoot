<template>
  <header class="header-collapsed"">
    <div class="header-branding">
      <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
       <span class="header-elements">
         <div style="display: inline-flex;">
          <h2 class="title" v-html="title"></h2>
          <div
            :class="
              `status-view--badge rounded-full leading-4 ${
                availableAgents.length ? 'bg-green-500' : 'bg-orange-500'
              }`
            "
            :title="
              `${
                availableAgents.length ? 'Online' : 'Currenlty Away'
              }`
            "
          />
            <span class="availability-status" v-if="availableAgents.length">Online</span>
            <span class="availability-status" v-else>Away</span>
         </div>
        <span class="reply-eta" v-if="availableAgents.length">Average response time is 30 minutes</span>
        <span class="reply-eta" v-else>We'll get back to you in a few hours</span>
        <span class="social-links">
            <span class="text-link">
                <a>
                	<span>Follow Us</span>
                  	<i class="fa fa-caret-right"></i>
                </a>
            </span>
            <!-- <span class="email" title="contact us via email">
                <a href="mailto:care@wevrlabs.net" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-envelope"></i>
                </a>
            </span>
            <span class="whatsapp" title="send us on WhatsApp">
                <a href="https://wa.me/19712514959" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </span> -->
            <span class="facebook" title="like our page on Facebook">
                <a href="https://fb.me/WevrLabs" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-facebook-f"></i>
                </a>
            </span>
            <span class="twitter" title="follow us on Twitter">
                <a href="https://twitter.com/WevrLabs" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-twitter"></i>
                </a>
            </span>
            <span class="linkedin" title="follow us on LinkedIn">
                <a href="https://www.linkedin.com/company/wevrlabs" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin"></i>
                </a>
            </span>
        </span>
    </span>
    </div>
    <header-actions :show-popout-button="showPopoutButton" />
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderActions from './HeaderActions';
import configMixin from 'widget/mixins/configMixin';
import teamAvailabilityMixin from 'widget/mixins/teamAvailabilityMixin';

export default {
  name: 'ChatHeader',
  components: {
    HeaderActions,
  },
  mixins: [configMixin, teamAvailabilityMixin],
  props: {
    avatarUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    introBody: {
      type: String,
      default: '',
    },
    introStatusMessageOnline: {
      type: String,
      default: '',
    },
    showPopoutButton: {
      type: Boolean,
      default: false,
    },
    availableAgents: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      widgetColor: 'appConfig/getWidgetColor',
    }),

  },
};
</script>

<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';
@import '~widget/assets/scss/mixins.scss';
@import url('https://chats.wevrlabs.net/fontawesome-all.min.css');

.header-collapsed {
  display: flex;
  justify-content: space-between;
  padding: $space-two;
  width: 100%;
  box-sizing: border-box;
  color: $color-white;
  
  .close-button:after {
    background-color: #9babbd !important;
  }
  .close-button:before {
    background-color: #9babbd !important;
  }
  
  .header-branding {
    display: flex;
    align-items: normal;

    img {
      border-radius: 50%;
    }
  }
  
  .header-elements.header-elements-2 {
    margin: 0 !important;
  }
  .header-elements {
    .title {
      font-size: $font-size-large;
      font-weight: $font-weight-medium;
      color: $color-white;
      margin-top: 3px;
    }
    .reply-eta {
      color: $color-white;
      display: block;
      opacity: .7!important;
      font-size: 11.6px!important;
      line-height: 16px;
      margin: 10px 3px 8px;
    }
    .social-links {
      margin: 5px 0 0;
      display: block;
      
        .whatsapp {
        }
       .text-link {
            a {
              width: auto !important;
              height: 30px !important;
              text-decoration: none;
              line-height: 1.4 !important;
              white-space: nowrap;
              border-radius: 50px !important;
              font-weight: 300 !important;
              color: #eaeaea;
              font-size: 12px;
                span {
                    margin: 0 7px 0 5px;
                    top: -1px;
                    position: relative;
                }
              }
        }
        
       span a {
          background: rgba(0, 0, 0, 0.25);
          display: inline-block;
          border-radius: 50%;
          padding: 8px 9px;
          width: 35px;
          height: 32px;
          text-align: center;
          transition: .2s ease all;
          margin-right: 4px;
          
          &:hover i:before {
            opacity: 1;
            transition: .3s ease all;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.5);
            transition: .2s ease all;
            transform: translateY(1px);
          }
          
       i:before {
          opacity: .8;
          transition: .3s ease all;
          color: #fff;
          font-size: 15px;
      }
        
        i.fab.fa-whatsapp:before {
             background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADpElEQVRoge2ZS4hWZRjHf4/jqGUXldSyCxTkFHSZyCBtUUq1qI0LobAWLUokCFqEkbUIhqCSICqyEqJFdCGIQKhFDYVl1KIIA5WwjemIlaYxZk3mr8WZD6Yz7/m+93yXmUXz233v5Xn///f5znkvB2aY4f9NdCOIOgu4AVgNrAAGgAuB+eNjjAIjwA/AN8BnwFcR8U83xm8bdZn6lLrf+oyoW9RLpkP4IvUl9c82hJcZU7epi6dK/Dr15y4IL3NUvbeXwvvUF3ogvMw2tb/b4ueq70+B+AYfqfO7Jb5PfW8KxTf4RJ3bDQPPT4P4Bq91Kn6tenoaDaiub6axciFTzwH2AMs6moXO+Q0YiIhfUpWzmnR8kjzx+4BhIDlAF1gIDNXqoS5R/8hI79MW24jGqjzao7/RX+rFKa1VGdgInNHC58fAYxFxGiAiRoC3as1UPnOAh7JaqqHuy5iVmxN9B3uUAdUDjme7lYFrM4L9rc6u6L+zhyZWlsdLOVqdkahfI+JURd0bGf3b5ZZyQcrA9RmBFqvzKuqurqOoJivKBSkDAxmB+lLB1DuBB+vryubyckHKwPmZwe5PlL1KYa5XXFAuSBk4OzPYPepgqezl2pLqMUlbykDVw1lmNrBVnTjjzwJftCEsF8sFKQPHagS8EdjU+DH+ZlpHcXjvBb+XC1IGjtQMOqTe3vgREYeBNcC3Fe2/o9hn7a85DhQ3G82xONLV5ai6vBRnnvqiempCu0PqReP1/ep96p4a47yTY2BjGwa0uFq5LBHvGvVti4uAmxL1s9S71ZMZYzySY+CKNg2oHlQnrQ85qD9lxL8uN9iuDkycsMhi9q2fxT1Tq5Pfj6mYVbu7TrbFZwJbgWF1VWafDbS+5nwzIia9RpOoC9VjHWRhIjvUB9RFiXH61c3+90FPcUJdmtLa7Ew8BDyR5TiPMeBr4EuKc+5SYC1waUbf5yKi9QM8EfXhLmWgUw6p51bpbHbCubWW494gsCEijlc1SBpQ5wCTjozTwJaI2N6sQVUGVgJndV9PLT4ANrdqVGXgtu5qqc27wF05X3CqDEzX/1/gGWB9RIy1F6FYA1q9l3vBAfWOunpTGVhD82PhSWAH8DqJ/XkbjFLM+pUR8WHH0dRXSjNzRN2ublJXWbyhGm0XqI+q37cx43vVx9XzOtE7aSVWPwUOAjuBz4HdjevDFsaXUzw7g8BVwBJgAUWWjwOHgb0Un1mHI2J3J8JnmGGGgn8BSiRCGCWj8SIAAAAASUVORK5CYII=);
            transform: scale(1.7);
            background-size: contain!important;
            background-repeat: no-repeat!important;
            background-position: 50%!important;
            display: inline-block!important;
            width: 13px!important;
            height: 10px!important;
            margin-top: 2px!important;
            content: "" !important;
        }
      }
    }
   }

  img {
    height: 55px;
    width: 55px;
    margin-right: 1rem;
    box-shadow: 0 20px 30px -13px rgba(0, 0, 0, 0.55);
  }

  .close-button {
    /*display: none;*/
  }

  button.button.transparent.compact.close-button {
    margin-left: -0.4rem !important;
    margin-top: -70px !important;
  }

}

.status-view--badge {
    height: 0.55rem;
    width: 0.55rem;
    margin-top: 8px;
    margin-left: 10px;
}
.status-view--badge.bg-green-500 {
    animation: pulse-g 2s infinite;
}
@keyframes pulse-g {
  0% {
    transform: scale(0.85);
    box-shadow: 0 0 0 0 #08bb13;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px transparent;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 transparent;
  }
}


.status-view--badge.bg-orange-500 {
  background-color: #ffbc00;
  animation: pulse-o 2s infinite;
}
@keyframes pulse-o {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 #a0894f;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px transparent;
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 transparent;
  }
}

span.availability-status {
    display: inline-block;
    margin-left: 7px;
    bottom: -7px!important;
    position: relative;
    color: #fff;
    font-size: 12px;
}
</style>
