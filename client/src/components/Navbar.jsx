import {Link} from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#6177A6] text-white text-lg flex items-center justify-between py-4 px-10">
        <div>
            <svg width="118" height="85" viewBox="0 0 118 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.378 76.742C40.378 77.306 40.246 77.792 39.982 78.2C39.73 78.596 39.31 78.962 38.722 79.298C38.326 79.538 37.864 79.718 37.336 79.838C36.808 79.958 36.274 80.018 35.734 80.018C35.182 80.018 34.498 79.838 33.682 79.478C33.094 79.19 32.626 78.848 32.278 78.452C31.942 78.056 31.774 77.624 31.774 77.156C31.774 76.832 31.846 76.598 31.99 76.454C32.134 76.298 32.368 76.22 32.692 76.22C32.86 76.22 33.034 76.292 33.214 76.436C33.394 76.568 33.502 76.7 33.538 76.832C33.706 77.324 34 77.702 34.42 77.966C34.84 78.218 35.362 78.344 35.986 78.344C36.706 78.344 37.306 78.212 37.786 77.948C38.278 77.684 38.524 77.33 38.524 76.886C38.524 76.454 38.26 76.07 37.732 75.734C37.204 75.398 36.664 75.164 36.112 75.032C35.32 74.816 34.618 74.558 34.006 74.258C33.37 73.946 32.896 73.562 32.584 73.106C32.272 72.65 32.116 72.17 32.116 71.666C32.116 71.198 32.278 70.724 32.602 70.244C32.926 69.752 33.31 69.398 33.754 69.182C33.994 69.062 34.402 68.936 34.978 68.804C35.566 68.66 35.992 68.588 36.256 68.588C36.604 68.588 36.988 68.63 37.408 68.714C37.828 68.798 38.17 68.918 38.434 69.074C38.962 69.374 39.352 69.644 39.604 69.884C39.856 70.124 39.982 70.424 39.982 70.784C39.982 71 39.898 71.192 39.73 71.36C39.574 71.528 39.298 71.612 38.902 71.612C38.806 71.612 38.71 71.57 38.614 71.486C38.518 71.402 38.398 71.276 38.254 71.108C38.062 70.856 37.876 70.688 37.696 70.604C37.516 70.544 37.252 70.478 36.904 70.406C36.568 70.334 36.268 70.298 36.004 70.298C35.716 70.298 35.416 70.358 35.104 70.478C34.792 70.598 34.528 70.772 34.312 71C34.108 71.216 34.006 71.468 34.006 71.756C34.006 71.996 34.114 72.206 34.33 72.386C34.558 72.554 34.828 72.692 35.14 72.8C35.5 72.944 35.89 73.07 36.31 73.178C36.862 73.346 37.312 73.502 37.66 73.646C38.02 73.778 38.368 73.946 38.704 74.15C39.292 74.498 39.718 74.858 39.982 75.23C40.246 75.59 40.378 76.094 40.378 76.742ZM46.8494 75.932C46.3814 75.932 45.9854 75.92 45.6614 75.896C45.3494 75.86 44.9354 75.806 44.4194 75.734L44.4014 77.624C44.3894 77.948 44.3834 78.41 44.3834 79.01C44.3834 79.322 44.2934 79.568 44.1134 79.748C43.9454 79.916 43.7534 80 43.5374 80C43.1414 80 42.8474 79.952 42.6554 79.856C42.4634 79.748 42.3674 79.562 42.3674 79.298C42.3674 78.95 42.3974 78.458 42.4574 77.822C42.5894 76.454 42.6554 75.05 42.6554 73.61C42.6554 72.266 42.6134 71 42.5294 69.812C42.5414 69.644 42.6254 69.452 42.7814 69.236C42.9494 69.02 43.1594 68.9 43.4114 68.876C43.6874 68.876 44.1254 68.828 44.7254 68.732C45.3494 68.636 45.8234 68.588 46.1474 68.588C47.1314 68.588 47.8934 68.684 48.4334 68.876C48.9854 69.068 49.5374 69.386 50.0894 69.83C50.6894 70.766 50.9894 71.426 50.9894 71.81C50.9894 72.614 50.8274 73.328 50.5034 73.952C50.1794 74.576 49.7054 75.062 49.0814 75.41C48.4574 75.758 47.7134 75.932 46.8494 75.932ZM46.4354 70.118C46.0514 70.118 45.7154 70.142 45.4274 70.19C45.1514 70.226 44.8154 70.292 44.4194 70.388C44.4674 71.492 44.4914 72.296 44.4914 72.8C44.4914 73.316 44.4734 73.748 44.4374 74.096C44.9534 74.204 45.3614 74.276 45.6614 74.312C45.9614 74.336 46.2974 74.348 46.6694 74.348C47.5574 74.348 48.1814 74.12 48.5414 73.664C48.9134 73.196 49.0994 72.656 49.0994 72.044C49.0994 71.864 49.0454 71.642 48.9374 71.378C48.8294 71.114 48.7334 70.94 48.6494 70.856C48.3254 70.568 48.0074 70.376 47.6954 70.28C47.3954 70.172 46.9754 70.118 46.4354 70.118ZM57.6366 68.552C58.4406 68.552 59.1726 68.654 59.8326 68.858C60.4926 69.05 61.0326 69.338 61.4526 69.722C62.2086 70.406 62.7366 71.156 63.0366 71.972C63.3486 72.776 63.5046 73.808 63.5046 75.068C63.5046 75.332 63.4686 75.572 63.3966 75.788C63.3366 76.004 63.2346 76.28 63.0906 76.616C62.9106 76.988 62.8026 77.282 62.7666 77.498C62.5266 77.918 62.1306 78.32 61.5786 78.704C61.0386 79.088 60.4506 79.4 59.8146 79.64C59.1786 79.88 58.6206 80 58.1406 80C55.8246 80 54.1746 79.208 53.1906 77.624C52.9146 77.18 52.6986 76.718 52.5426 76.238C52.3986 75.758 52.3266 75.29 52.3266 74.834C52.3266 73.61 52.5426 72.548 52.9746 71.648C53.4186 70.736 54.0306 70.028 54.8106 69.524C55.2786 69.248 55.7646 69.02 56.2686 68.84C56.7846 68.648 57.2406 68.552 57.6366 68.552ZM54.1986 74.888C54.1986 75.536 54.3426 76.07 54.6306 76.49C54.9306 76.91 55.3866 77.366 55.9986 77.858C56.5026 78.05 56.8446 78.176 57.0246 78.236C57.2046 78.284 57.4086 78.308 57.6366 78.308C58.8486 78.308 59.8146 77.978 60.5346 77.318C61.2546 76.658 61.6146 75.752 61.6146 74.6C61.6146 73.688 61.5126 72.968 61.3086 72.44C61.1046 71.912 60.7386 71.438 60.2106 71.018C59.9346 70.79 59.5806 70.622 59.1486 70.514C58.7286 70.406 58.2726 70.352 57.7806 70.352C57.0366 70.352 56.3946 70.574 55.8546 71.018C55.3146 71.45 54.9006 72.014 54.6126 72.71C54.3366 73.406 54.1986 74.132 54.1986 74.888ZM71.7776 75.23C72.8216 77.006 73.7996 78.416 74.7116 79.46C74.8076 79.556 74.8556 79.664 74.8556 79.784C74.8556 79.94 74.7596 80.072 74.5676 80.18C74.3756 80.3 74.1536 80.36 73.9016 80.36C73.5296 80.36 73.1276 80.204 72.6956 79.892C72.3836 79.676 72.0956 79.358 71.8316 78.938C71.5676 78.506 71.2676 77.954 70.9316 77.282L70.6256 76.67C70.3136 76.106 70.1276 75.776 70.0676 75.68C69.8036 75.788 69.4976 75.866 69.1496 75.914C68.8016 75.962 68.3756 76.004 67.8716 76.04C67.8956 77.576 67.9076 78.65 67.9076 79.262C67.9076 79.49 67.8236 79.676 67.6556 79.82C67.4876 79.952 67.2776 80.018 67.0256 80.018C66.7136 80.018 66.4736 79.892 66.3056 79.64C66.1376 79.304 66.0536 78.782 66.0536 78.074L66.0716 76.76C66.0716 75.944 66.0896 75.17 66.1256 74.438C66.1496 73.478 66.1616 72.77 66.1616 72.314L66.1796 71.396C66.1796 71.12 66.1616 70.838 66.1256 70.55C65.9336 70.49 65.7656 70.4 65.6216 70.28C65.4776 70.148 65.4056 70.004 65.4056 69.848C65.4056 69.548 65.5136 69.32 65.7296 69.164C65.9576 68.996 66.2396 68.888 66.5756 68.84C67.5476 68.684 68.4956 68.606 69.4196 68.606C70.9916 68.606 72.2936 68.9 73.3256 69.488C74.3576 70.076 74.8736 70.97 74.8736 72.17C74.8736 72.542 74.7896 72.902 74.6216 73.25C74.4656 73.586 74.2496 73.868 73.9736 74.096C73.2536 74.66 72.5216 75.038 71.7776 75.23ZM72.9656 72.116C72.9656 71.54 72.6596 71.072 72.0476 70.712C71.4476 70.34 70.5836 70.154 69.4556 70.154C68.9636 70.154 68.4596 70.214 67.9436 70.334C67.9676 70.766 67.9796 71.072 67.9796 71.252C67.9796 71.612 67.9556 72.128 67.9076 72.8C67.8836 73.472 67.8716 74.012 67.8716 74.42C68.6756 74.42 69.4436 74.312 70.1756 74.096C70.7036 73.94 71.1476 73.79 71.5076 73.646C71.8676 73.502 72.1976 73.304 72.4976 73.052C72.8096 72.788 72.9656 72.476 72.9656 72.116ZM75.7234 69.506C75.7234 68.99 76.1014 68.732 76.8574 68.732C77.1814 68.732 77.7994 68.744 78.7114 68.768C79.7194 68.816 80.4814 68.84 80.9974 68.84C81.4174 68.84 81.9274 68.816 82.5274 68.768C82.9354 68.744 83.1934 68.732 83.3014 68.732C83.9614 68.756 84.5194 68.876 84.9754 69.092C85.1074 69.152 85.2154 69.224 85.2994 69.308C85.3834 69.392 85.4254 69.53 85.4254 69.722C85.4254 69.986 85.3414 70.214 85.1734 70.406C85.0054 70.586 84.8014 70.676 84.5614 70.676C84.2974 70.676 83.9134 70.64 83.4094 70.568C82.9654 70.484 82.5754 70.442 82.2394 70.442C81.9154 70.442 81.6694 70.448 81.5014 70.46C81.4654 70.856 81.4474 71.804 81.4474 73.304C81.4474 75.092 81.5014 76.904 81.6094 78.74L81.6454 79.262C81.6454 79.754 81.3634 80 80.7994 80C80.3554 80 80.0554 79.898 79.8994 79.694C79.7434 79.478 79.6654 79.154 79.6654 78.722C79.6654 77.87 79.6414 76.808 79.5934 75.536C79.5454 74.48 79.5214 73.73 79.5214 73.286C79.5214 72.986 79.5574 72.068 79.6294 70.532L77.5234 70.55C76.8514 70.55 76.3834 70.49 76.1194 70.37C75.8554 70.238 75.7234 69.95 75.7234 69.506ZM87.9552 80.054C87.5952 80.054 87.3432 79.946 87.1992 79.73C87.0672 79.514 87.0012 79.208 87.0012 78.812L87.0192 76.472L87.0012 76.112C86.9412 74.972 86.9112 74.03 86.9112 73.286L86.9832 71.144L87.0012 70.064C87.0012 69.704 87.0132 69.428 87.0372 69.236C87.0612 69.044 87.1392 68.888 87.2712 68.768C87.4032 68.648 87.6132 68.588 87.9012 68.588C88.2612 68.588 88.5192 68.678 88.6752 68.858C88.8312 69.026 88.9092 69.32 88.9092 69.74L88.8912 70.118C88.8432 71.078 88.8192 71.804 88.8192 72.296C88.8192 72.836 88.8312 73.472 88.8552 74.204C88.8792 74.924 88.8972 75.434 88.9092 75.734C88.9692 77.018 88.9992 78.122 88.9992 79.046C88.9992 79.406 88.9212 79.664 88.7652 79.82C88.6212 79.976 88.3512 80.054 87.9552 80.054ZM92.433 80.054C92.157 80.054 91.947 79.982 91.803 79.838C91.659 79.682 91.587 79.526 91.587 79.37C91.659 78.938 91.701 78.476 91.713 77.984C91.725 77.492 91.731 77.198 91.731 77.102V76.454C91.731 75.962 91.725 75.53 91.713 75.158C91.701 74.774 91.689 74.45 91.677 74.186C91.629 73.13 91.605 72.308 91.605 71.72V71.162C91.629 70.586 91.659 70.082 91.695 69.65C91.707 69.482 91.809 69.302 92.001 69.11C92.205 68.918 92.481 68.798 92.829 68.75C93.969 68.63 95.385 68.57 97.077 68.57H97.653C98.073 68.57 98.487 68.648 98.895 68.804C99.315 68.96 99.525 69.224 99.525 69.596C99.525 69.848 99.465 70.052 99.345 70.208C99.225 70.352 98.991 70.424 98.643 70.424C98.487 70.424 98.307 70.412 98.103 70.388C97.899 70.364 97.755 70.346 97.671 70.334C97.215 70.262 96.861 70.226 96.609 70.226C95.217 70.226 94.161 70.322 93.441 70.514V71.504V73.574C94.257 73.574 95.109 73.538 95.997 73.466C96.645 73.418 97.065 73.394 97.257 73.394C97.533 73.394 97.767 73.46 97.959 73.592C98.163 73.712 98.265 73.898 98.265 74.15C98.265 74.774 97.839 75.086 96.987 75.086C96.783 75.086 96.477 75.11 96.069 75.158C95.613 75.206 95.259 75.23 95.007 75.23C94.851 75.23 94.629 75.218 94.341 75.194C93.969 75.17 93.717 75.164 93.585 75.176C93.573 75.488 93.579 75.974 93.603 76.634L93.621 77.84C93.621 78.248 93.615 78.554 93.603 78.758C93.591 78.95 93.555 79.16 93.495 79.388C93.459 79.58 93.351 79.742 93.171 79.874C92.991 79.994 92.745 80.054 92.433 80.054ZM109.687 69.434C109.687 69.65 109.501 69.968 109.129 70.388C108.685 70.892 107.527 72.44 105.655 75.032C105.679 76.58 105.727 77.642 105.799 78.218C105.835 78.578 105.853 78.836 105.853 78.992C105.853 79.388 105.781 79.658 105.637 79.802C105.505 79.934 105.271 80 104.935 80C104.683 80 104.443 79.928 104.215 79.784C103.999 79.628 103.891 79.442 103.891 79.226C103.891 78.35 103.873 77.066 103.837 75.374C103.837 75.302 103.789 75.182 103.693 75.014C103.597 74.846 103.537 74.738 103.513 74.69C103.261 74.246 102.943 73.754 102.559 73.214C102.187 72.662 101.863 72.248 101.587 71.972C101.059 71.444 100.645 70.97 100.345 70.55C100.045 70.118 99.8954 69.812 99.8954 69.632C99.8954 69.38 100.009 69.182 100.237 69.038C100.477 68.882 100.735 68.804 101.011 68.804C101.167 68.804 101.329 68.846 101.497 68.93C101.677 69.014 101.821 69.134 101.929 69.29C102.637 70.346 103.267 71.222 103.819 71.918L104.665 73.016C105.181 72.488 105.631 71.966 106.015 71.45C106.411 70.922 106.843 70.298 107.311 69.578L107.617 69.11C107.845 68.798 108.199 68.642 108.679 68.642C108.907 68.642 109.129 68.708 109.345 68.84C109.573 68.972 109.687 69.17 109.687 69.434Z" fill="white"/>
                <path d="M100.525 0C101.383 0 101.376 0 101.125 0.965665C101.099 1.10827 101.086 1.25336 101.086 1.39879C101.008 1.70622 100.911 2.00749 100.796 2.30055C100.694 2.54088 100.534 2.74503 100.332 2.88989C100.129 2.99022 99.946 3.13581 99.796 3.31752C99.646 3.49924 99.5317 3.71315 99.4603 3.94585C99.3889 4.17854 99.3619 4.42498 99.381 4.66971C99.4002 4.91444 99.465 5.15216 99.5715 5.36796C99.6708 5.59481 99.8129 5.79569 99.9883 5.95713C100.164 6.11858 100.368 6.23688 100.589 6.30411C100.809 6.37133 101.04 6.38594 101.266 6.34695C101.492 6.30795 101.707 6.21626 101.898 6.07801C102.093 5.9596 102.262 5.79774 102.396 5.60282C102.53 5.4079 102.626 5.18423 102.677 4.94618C102.728 4.70813 102.733 4.46097 102.692 4.22056C102.651 3.98016 102.565 3.75183 102.44 3.55024C102.319 3.23887 102.227 2.9155 102.163 2.58457C102.362 1.97393 102.575 1.36329 102.756 0.73845C102.936 0.113608 103.187 0.213014 103.51 0.532536C104.114 1.07128 104.58 1.77472 104.862 2.57308C105.143 3.37144 105.23 4.23701 105.115 5.08394C105.115 5.31116 105.115 5.53837 105.069 5.79399C104.605 6.78096 104.232 7.88153 103.181 8.30046C102.403 8.62307 101.594 8.84931 100.77 8.97501C99.9067 9.08861 99.5329 9.59985 99.7327 10.5371C100.21 12.8235 100.641 15.1169 101.08 17.4175C101.157 17.8435 101.17 18.2837 101.228 18.7169C101.271 18.9082 101.327 19.0956 101.396 19.2778C101.544 19.1812 101.685 19.0695 101.815 18.9441C102.852 17.8648 103.858 16.7429 104.921 15.6921C105.251 15.3857 105.664 15.2095 106.095 15.1915C106.526 15.1735 106.95 15.3147 107.299 15.5927C107.667 15.8767 107.847 17.3039 107.59 17.9287C107.493 18.163 107.377 18.376 107.274 18.6033C105.733 20.2293 104.186 21.8482 102.659 23.4884C101.131 25.1286 99.4813 24.9085 98.4565 22.8209C97.6702 21.2233 96.916 19.6044 96.1748 17.9855C96.0201 17.6447 95.9364 17.5666 95.6656 17.8648C94.1188 19.5547 92.5783 21.2588 90.9928 22.9132C90.5094 23.4174 90.7994 23.5523 91.1732 23.7511C93.3002 24.8801 95.4336 25.9878 97.5477 27.1451C98.5016 27.6635 99.5264 28.0966 100.126 29.1759C100.565 29.9092 100.766 30.7843 100.697 31.6594C100.628 32.5344 100.293 33.3582 99.7456 33.9971C97.3285 36.9651 94.9373 39.9544 92.5332 42.9366C92.7442 42.9999 92.9599 43.0427 93.1777 43.0644C100.62 43.0644 108.064 43.0644 115.511 43.0644H115.994C116.291 43.021 116.593 43.093 116.847 43.268C117.101 43.4429 117.292 43.7099 117.386 44.023C117.644 44.733 117.316 45.1093 116.955 45.5425C113.281 45.5851 109.607 45.6561 105.933 45.6561C91.5084 45.6561 77.0837 45.6561 62.659 45.6561H61.486C61.3264 45.6758 61.1648 45.6588 61.0114 45.6061C60.8581 45.5535 60.7163 45.4663 60.5952 45.3502C60.474 45.2341 60.376 45.0915 60.3075 44.9314C60.2389 44.7714 60.2013 44.5975 60.1969 44.4206C60.1915 44.2366 60.2218 44.0535 60.2858 43.8835C60.3499 43.7134 60.4461 43.5605 60.5682 43.4347C60.6902 43.309 60.8353 43.2135 60.9935 43.1545C61.1518 43.0955 61.3197 43.0745 61.486 43.0928C62.8878 43.0075 64.2929 43.0075 65.6948 43.0928C67.2417 43.2774 68.2729 42.5248 69.3429 41.4455C71.3323 39.3816 73.354 37.3532 75.4079 35.3604C76.0727 34.8278 76.7657 34.3394 77.4833 33.8977C77.8276 33.6637 78.1203 33.3484 78.3406 32.9746C79.4814 30.6954 80.5771 28.3877 81.6792 26.0872C81.8012 25.8764 81.8514 25.6248 81.821 25.3771C81.2925 23.3819 82.0595 21.8269 83.1681 20.4068C85.2048 17.7512 87.2029 14.9891 89.201 12.2838C89.2901 12.1447 89.3719 12.0001 89.4459 11.8507C89.2848 11.7847 89.1149 11.7487 88.9432 11.7442C87.5058 11.8791 86.0685 12.0282 84.6312 12.2057C84.4164 12.2743 84.2254 12.413 84.0834 12.6033C82.7943 14.0731 81.5052 15.5642 80.2162 17.0411C79.963 17.3382 79.6917 17.6158 79.404 17.8719C79.1801 18.0919 78.9018 18.2336 78.6046 18.2791C78.3074 18.3246 78.0046 18.2719 77.7347 18.1275C77.4522 17.9824 77.2121 17.7533 77.0413 17.466C76.8705 17.1788 76.7758 16.8448 76.7679 16.5015C76.7335 16.1048 76.7953 15.7051 76.9471 15.3433C77.0988 14.9815 77.335 14.6706 77.6316 14.4424C78.2695 13.7995 78.8621 13.104 79.404 12.3619C80.6093 11.0412 81.7759 9.68505 83.0328 8.42827C83.5087 7.96736 84.0831 7.64729 84.7021 7.49811C86.7775 7.02947 88.8787 6.65315 90.9734 6.27682C92.4027 5.91014 93.8873 5.89075 95.324 6.22002C95.821 6.28474 96.3247 6.24132 96.8065 6.09221C97.2319 6.01411 97.4059 5.73009 97.3092 5.21885C97.2324 4.82458 97.2172 4.41878 97.2641 4.01887C97.3482 3.05363 97.7099 2.14321 98.2966 1.4203C98.8832 0.697395 99.6641 0.199785 100.525 0ZM80.7318 43.0502C82.7363 43.0502 84.7343 43.0502 86.7388 43.0502C86.9648 43.0729 87.1918 43.0225 87.3921 42.9052C87.5925 42.7879 87.7574 42.6088 87.8668 42.3899C88.2535 41.6798 88.7047 41.055 89.1172 40.3875C90.6512 37.9308 92.1723 35.4598 93.7192 33.0172C94.035 32.5202 93.9834 32.3498 93.4549 32.1581C91.8307 31.5616 90.2322 30.9226 88.6016 30.2622C88.2448 30.0553 87.8327 29.9952 87.4393 30.0928C87.046 30.1904 86.6971 30.4393 86.4553 30.7948C85.4047 32.2149 84.3089 33.564 83.2906 34.9983C82.3566 36.5105 81.0446 37.6919 79.5136 38.3994C79.0464 38.6142 78.6117 38.9063 78.2245 39.2656C76.9741 40.3378 75.7495 41.4384 74.5249 42.5319C74.4059 42.6608 74.3 42.8037 74.2091 42.9579C74.3551 42.9977 74.5038 43.0238 74.6538 43.036L80.7318 43.0502Z" fill="white"/>
                <path d="M117.638 62.3212C117.844 63.3224 117.309 63.3437 116.561 63.2656C111.921 62.797 107.538 61.2775 103.149 59.6231C101.559 58.9849 99.9308 58.4701 98.276 58.0823C94.7504 57.3722 92.5203 58.3308 90.7478 61.7958C90.1033 63.081 89.3621 63.3366 88.1697 63.3934C86.2361 63.4857 84.8245 63.2159 83.7546 61.0006C82.3624 58.1036 79.7907 57.4503 76.9354 58.0326C74.4102 58.6779 71.9256 59.5033 69.4975 60.5035C65.9062 61.8953 62.1788 62.8176 58.3922 63.2514C58.0828 63.2514 57.5929 63.507 57.4769 63.1662C57.3463 62.6246 57.3156 62.0596 57.3867 61.5047C57.3867 61.2349 57.7412 61.3201 57.941 61.3059C62.7814 60.9296 67.3319 59.2467 71.8694 57.5284C73.6742 56.795 75.5423 56.2668 77.4446 55.9521C81.0927 55.448 83.7933 57.0882 85.6689 60.4609C85.8152 60.7463 86.0293 60.9823 86.2882 61.1437C86.5471 61.3051 86.841 61.3857 87.1384 61.3769C87.6438 61.4691 88.1628 61.3811 88.6196 61.1257C89.0764 60.8702 89.4472 60.4607 89.6779 59.9568C91.6502 56.577 94.5506 55.3841 98.1342 56.0586C101.189 56.6338 104.045 57.9331 106.971 58.9485C110.23 60.1773 113.613 60.9618 117.045 61.2846C117.786 61.3272 117.715 61.7745 117.638 62.3212Z" fill="white"/>
                <path d="M78.9014 54.0492C76.3877 54.1131 74.0287 54.9793 71.6762 55.8243C67.9187 57.2809 64.0287 58.2832 60.0745 58.8136C59.6492 58.8633 59.2302 58.8917 58.7855 58.9414C58.3407 58.9911 58.3988 58.7355 58.3859 58.4444C58.373 58.1533 58.3859 57.926 58.7339 57.9047C64.4574 57.5994 69.7361 55.2563 75.176 53.6445C78.1344 52.7498 81.0864 52.6717 83.8643 54.4681C85.0126 55.2117 86.0569 56.1349 86.9645 57.2089C87.2675 57.5781 87.5124 57.6846 87.8153 57.2089C87.8941 57.1067 87.978 57.0095 88.0667 56.9178C91.1798 53.3675 94.9374 52.2315 99.2494 53.5237C102.221 54.4113 105.153 55.4409 108.112 56.3639C110.614 57.1404 113.178 57.6469 115.769 57.8763C116.078 57.8763 116.413 57.784 116.413 58.4018C116.413 59.0195 115.994 58.9059 115.666 58.8775C111.6 58.4737 107.595 57.5198 103.742 56.0373C102.079 55.4338 100.403 54.8657 98.6951 54.4255C94.9954 53.4527 91.7534 54.319 89.027 57.3154C88.7499 57.6207 88.4663 57.926 88.1956 58.2314C87.5124 58.9982 87.2417 59.0124 86.5778 58.2314C85.2525 56.5326 83.5521 55.2389 81.6407 54.4752C80.7545 54.1709 79.8294 54.027 78.9014 54.0492Z" fill="white"/>
                <path d="M78.9141 49.3345C82.1368 49.228 84.6054 50.7972 86.713 53.2043C87.2544 53.822 87.538 53.8788 88.0923 53.2043C91.4375 49.1996 95.5367 48.5677 100.106 49.9949C103.181 50.9605 106.184 52.1747 109.291 52.9913C111.428 53.5591 113.603 53.9413 115.794 54.1344C116.175 54.1344 116.516 54.1344 116.497 54.7593C116.478 55.3841 116.091 55.3273 115.736 55.2918C112.456 54.9876 109.215 54.2973 106.068 53.2327C103.329 52.3451 100.661 51.1877 97.8248 50.641C96.2931 50.2982 94.7083 50.3781 93.2115 50.8737C91.7147 51.3692 90.3524 52.265 89.246 53.4812C87.4091 55.3983 87.4091 55.4267 85.6109 53.5451C82.8523 50.6623 79.6231 49.9097 75.9815 50.8398C73.0102 51.5925 70.1807 52.8706 67.2352 53.68C64.6243 54.4828 61.9505 55.0129 59.2494 55.2634C58.8949 55.2634 58.347 55.5687 58.3019 54.7593C58.2568 53.9498 58.7789 54.1557 59.1656 54.1273C63.4389 53.7723 67.5446 52.48 71.56 51.0315C73.9835 50.2008 76.3811 49.2706 78.9141 49.3345Z" fill="white"/>
                <path d="M86.5262 45.8407C77.1869 45.8407 67.8347 45.9259 58.5147 45.791C55.4919 45.7484 54.003 46.8419 54.3833 50.2856C54.8796 54.4962 52.2241 56.7471 49.6137 56.882C46.6231 57.0453 44.6508 54.2903 44.6379 50.0513C44.6379 42.9508 44.6379 35.8504 44.6379 28.7499C44.6379 27.1239 44.9344 25.1144 42.7043 25.0576C40.2422 24.9866 40.558 27.1878 40.558 28.8919C40.558 37.4125 40.558 45.933 40.558 54.4536C40.5942 55.5129 40.5359 56.5736 40.384 57.6204C39.8426 60.5458 38.2441 62.1931 35.4404 62.0866C32.6367 61.9801 31.064 60.1766 30.8127 57.2299C30.6 54.6524 30.716 52.0323 30.716 49.4194C30.716 39.9521 30.716 30.4966 30.716 21.053C30.716 20.2222 30.7546 19.3914 30.716 18.5678C30.6193 17.1903 30.2584 15.9122 28.7308 15.8838C27.0486 15.8696 26.5523 17.0412 26.5523 18.7027C26.5523 24.492 26.5523 30.2836 26.5523 36.0776C26.5523 44.7047 26.5523 53.3317 26.5523 61.9659C26.5523 66.2901 24.6767 68.7682 21.5636 68.6972C18.4505 68.6262 16.8391 66.3824 16.8262 62.1434C16.8262 56.463 16.8262 50.7827 16.8262 45.1023C16.8262 43.4266 16.9874 41.5023 14.8926 41.2822C12.7979 41.0621 12.669 42.8798 12.3725 44.6052C12.2342 45.7354 11.7393 46.776 10.9745 47.5445C10.2097 48.3131 9.22375 48.7606 8.18948 48.8087C6.15612 48.9697 4.11608 49.0029 2.07929 48.9081C1.10605 48.9081 0.00389272 48.7661 0.14569 47.2324C0.242371 46.0537 1.08027 45.7626 2.01484 45.7555C3.62618 45.7555 5.23751 45.7058 6.84241 45.7555C8.5891 45.8194 9.56234 45.223 9.85883 43.0573C10.3164 39.7272 12.5852 37.732 15.0602 38.0089C17.7931 38.3071 19.4946 40.6503 19.514 44.2786C19.514 50.1862 19.514 56.0938 19.514 62.0298C19.514 63.7765 19.572 65.5801 21.6925 65.5375C23.813 65.4949 23.813 63.5919 23.8195 61.902C23.8195 47.9567 23.8195 34.009 23.8195 20.0589C23.8195 15.0176 25.2374 12.8874 28.5697 12.8661C31.9019 12.8448 33.5777 15.2377 33.5842 20.279C33.5842 31.512 33.5842 42.7426 33.5842 53.9708C33.5842 54.6808 33.5842 55.3909 33.5842 56.1009C33.539 57.6772 33.8806 59.0405 35.5693 59.0831C37.258 59.1257 37.6383 57.7624 37.6318 56.1932C37.6318 51.2324 37.6318 46.262 37.6318 41.2822C37.6318 36.7947 37.5545 32.3001 37.6318 27.7913C37.7156 24.0565 39.8104 21.7488 42.7494 21.8624C45.5532 21.9689 47.3385 24.163 47.3707 27.8694C47.4352 34.7214 47.3707 41.5804 47.3707 48.4608C47.3707 49.2916 47.3256 50.1223 47.3707 50.946C47.4932 52.4868 47.9766 53.7862 49.6588 53.6726C51.1026 53.5589 51.5022 52.4584 51.5924 50.9673C52.1919 43.384 52.7719 42.8443 59.8296 42.8443H113.597C114.351 42.8443 115.098 42.8443 115.853 42.8443C116.871 42.894 117.464 43.455 117.38 44.6336C117.296 45.8123 116.51 45.8336 115.73 45.8407C114.228 45.8407 112.727 45.8407 111.218 45.8407H86.5262Z" fill="white"/>
            </svg>

        </div>

        <div>
            <ul className="flex gap-24  uppercase ">
                <li className="ml-4 px-10 py-2 leading-5 font-medium font-semibold hover:text-gray-300 transition duration-250 ease-in-out">
                    <Link to={"/"}>Biografia</Link>
                </li>

                <li className="ml-4 px-10 py-2 leading-5 font-medium font-semibold hover:text-gray-300 transition duration-250 ease-in-out">
                    <Link to={"biblioteca"}>Equipos</Link>
                </li>

                <li className="ml-4 px-10 py-2 leading-5 font-medium font-semibold hover:text-gray-300 transition duration-250 ease-in-out">
                    <Link to={"reproductor"}>NBA</Link>
                </li>
            </ul>
        </div>

        <div className="flex items-center gap-3  font-bold">
        <div>
                <svg width="71" height="75" viewBox="0 0 71 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M35.2209 37.8207C31.9923 37.8207 29.2284 36.615 26.9293 34.2037C24.6301 31.7924 23.4806 28.8937 23.4806 25.5076C23.4806 22.1215 24.6301 19.2228 26.9293 16.8115C29.2284 14.4002 31.9923 13.1946 35.2209 13.1946C38.4495 13.1946 41.2134 14.4002 43.5125 16.8115C45.8117 19.2228 46.9612 22.1215 46.9612 25.5076C46.9612 28.8937 45.8117 31.7924 43.5125 34.2037C41.2134 36.615 38.4495 37.8207 35.2209 37.8207ZM11.7402 62.4467V53.8276C11.7402 52.0833 12.1683 50.48 13.0243 49.0178C13.8804 47.5556 15.0177 46.4398 16.4364 45.6702C19.4693 44.0798 22.5511 42.887 25.6819 42.0917C28.8126 41.2965 31.9923 40.8989 35.2209 40.8989C38.4495 40.8989 41.6292 41.2965 44.7599 42.0917C47.8907 42.887 50.9725 44.0798 54.0054 45.6702C55.4241 46.4398 56.5614 47.5556 57.4175 49.0178C58.2735 50.48 58.7016 52.0833 58.7016 53.8276V62.4467H11.7402ZM17.6104 56.2902H52.8314V53.8276C52.8314 53.2633 52.6969 52.7502 52.4278 52.2885C52.1588 51.8267 51.8041 51.4676 51.3639 51.2111C48.7223 49.8259 46.0563 48.787 43.3658 48.0943C40.6753 47.4017 37.9603 47.0554 35.2209 47.0554C32.4815 47.0554 29.7665 47.4017 27.076 48.0943C24.3856 48.787 21.7195 49.8259 19.0779 51.2111C18.6377 51.4676 18.283 51.8267 18.014 52.2885C17.7449 52.7502 17.6104 53.2633 17.6104 53.8276V56.2902ZM35.2209 31.6641C36.8352 31.6641 38.2171 31.0613 39.3667 29.8557C40.5163 28.65 41.0911 27.2007 41.0911 25.5076C41.0911 23.8146 40.5163 22.3652 39.3667 21.1596C38.2171 19.9539 36.8352 19.3511 35.2209 19.3511C33.6066 19.3511 32.2247 19.9539 31.0751 21.1596C29.9255 22.3652 29.3507 23.8146 29.3507 25.5076C29.3507 27.2007 29.9255 28.65 31.0751 29.8557C32.2247 31.0613 33.6066 31.6641 35.2209 31.6641Z"
                        fill="white"/>
                </svg>
            </div>
            <div>
                <p className="ml-4 py-2 leading-5 font-medium font-semibold hover:text-gray-300 transition duration-250 ease-in-out">
                    Nombre de Usuario
                </p>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;