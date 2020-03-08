<template>
    <div v-if="sentbyme" class="bubble me">
      {{ msg }}
    </div>
    <div v-else class="bubble you">
      {{ msg }}
    </div>
</template>

<script>
export default {
  name: 'Chatbubble',
  props:[
    'msg',
    'sentbyme'
  ]
};
</script>

<style lang="scss" scoped>
  .bubble {
    --white: #fff;
    --black: #000;
    --bg: #f8f8f8;
    --grey: #999;
    --dark: #1a1a1a;
    --light: #e6e6e6;
    --wrapper: 1000px;
    --blue: #00b0ff;
    font-size: 16px;
    position: relative;
    display: inline-block;
    clear: both;
    margin-bottom: 8px;
    max-width: 60%;
    white-space: pre-wrap;      /* CSS3 */   
   white-space: -moz-pre-wrap; /* Firefox */    
   white-space: -pre-wrap;     /* Opera <7 */   
   white-space: -o-pre-wrap;   /* Opera 7 */    
   word-wrap: break-word;    
    padding: 13px 14px;
    vertical-align: top;
    border-radius: 5px;
    &:before {
        position: absolute;
        top: 19px;
        display: block;
        width: 8px;
        height: 6px;
        content: '\00a0';
        transform: rotate(29deg) skew(-35deg);
    }
    &.you {
        float: left;
        color: var(--white);
        background-color: var(--blue);
        align-self: flex-start;
        animation-name: slideFromLeft;
        &:before {
            left: -3px;
            background-color: var(--blue);
        }
    }
    &.me {
        float: right;
        color: var(--dark);
        background-color: #eceff1;
        align-self: flex-end;
        animation-name: slideFromRight;
        transition :slideFromRight 3s ease-in;
        &:before {
            right: -3px;
            background-color: #eceff1;
        }
    }
}
    @keyframes slideFromLeft {
    0% {
        margin-left: -200px;
        opacity: 0;
    }
    100% {
        margin-left: 0;
        opacity: 1;
    }
}
@keyframes slideFromRight {
    0% {
        margin-right: -200px;
        opacity: 0;
    }
    100% {
        margin-right: 0;
        opacity: 1;
    }
}

</style>
