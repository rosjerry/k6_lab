for i in {1..3}; do k6 run --summary-export=results/go/go_$i.json index.js; done
