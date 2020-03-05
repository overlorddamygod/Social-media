<template>
    <div class="person">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
        <span class="name">Thomas Bangalter</span>
        <span class="time">2:09 PM</span>
        <span class="preview">I was wondering...</span>
    </div>
</template>

<script>
export default {
  name: 'Chatname',
  props:[

  ]
};
</script>

<style lang="scss" scoped>
@mixin font-bold {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 600;
}
    // .people {
    //         margin-left: -1px;
    //         border-right: 1px solid var(--light);
    //         border-left: 1px solid var(--light);
    //         width: calc(100% + 2px);
            .person {
                position: relative;
                width: 100%;
                padding: 12px 0% 16px;
                cursor: pointer;
                background-color: var(--white);
                &:after {
                    position: absolute;
                    bottom: 0;
                    // left: 50%;
                    display: block;
                    width: 80%;
                    height: 1px;
                    content: '';
                    background-color: var(--light);
                    transform: translate(-50%, 0);
                }
                img {
                    float: left;
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                    border-radius: 50%;
                }
                .name {
                    font-size: 14px;
                    line-height: 22px;
                    color: var(--dark);
                    @include font-bold;
                }
                .time {
                    font-size: 14px;
                    position: absolute;
                    top: 16px;
                    right: 10%;
                    padding: 0 0 5px 0;
                    color: var(--grey);
                    background-color: var(--white);
                }
                .preview {
                    font-size: 14px;
                    display: inline-block;
                    overflow: hidden !important;
                    width: 70%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: var(--grey);
                }
                &.active,&:hover {
                    margin-top: -1px;
                    // margin-left: -1px;
                    padding-top: 13px;
                    border: 0;
                    background-color: var(--blue);
                    // width: 100%;
                    // padding-left: calc(10% + 1px);
                    span {
                        color: var(--white);
                        background: transparent;
                    }
                    &:after {
                        display: none;
                    }
                }
            }
        // }

</style>
