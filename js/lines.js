/**
 * Created by Pavel on 05.04.2021.
 */
class Game
{
    constructor(cnvid, picpath, size, count, color)
    {
        this.pic = new Image();
        this.size = size;
        this.pic.src = picpath;
        this.canvas = document.querySelector(cnvid);
        this.scena = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.scena.fillStyle = color;
        this.ballsize = 40;
        this.ceils = [];
        this.result = [];
        let $this = this;
        this.pic.addEventListener("load", function()
        {
            for(let y = 0; y < count; y++)
            {
                $this.ceils[y] = [];
                for(let x = 0; x < count; x++)
                {
                    $this.ceils[y][x] = new Ceil();
                    $this.setBall(x, y, 0);
                    //this.scena.drawImage(this, 120,0, 40,40, x * size + 1 * (x + 10) + size / 2 - 20, y * size + 1 * (y + 10) + size / 2 - 20, 40, 40);
                }
            }

            $this.canvas.addEventListener("click", $this.clicker.bind($this));

        });

    }

    setBall(x, y, ballnum)
    {
        this.scena.fillRect(x * this.size + 1 * (x + 10), y * this.size + 1 * (y + 10), this.size, this.size);
        //if(ballnum > 0)
       // {
            this.ceils[y][x].ball = ballnum;
            let dx = (this.ceils[y][x].ball - 1) * this.ballsize;
            this.scena.drawImage(this.pic, dx, 0, this.ballsize, this.ballsize, x * this.size + 1 * (x + 10) + this.size / 2 - this.ballsize / 2, y * this.size + 1 * (y + 10) + this.size / 2 - this.ballsize /2, 40, 40);
        //}
    }

    clicker(ev)
    {
            //let arr;
            this.result = [];
            if(ev.offsetX > 10 && ev.offsetX < (this.size + 1) * 10 && ev.offsetY > 10 && ev.offsetY < (this.size + 1) * 10)
            {
                    let x = Math.floor((ev.offsetX - 10) / (this.size + 1));
                    let y = Math.floor((ev.offsetY - 10) / (this.size + 1));
                    this.setBall(x, y, 1);
            }

            this.setFive();


    }

    checkDiagonals(colornum, dx, dy) //Диагонали
    {
        let rd = [];
        let ld = [];

        for(let i = 0; i < 5; i++)
        {
            if(this.ceils[i + dy][5 - i + dx - 1].ball == colornum)
            {
                rd.push(new Point(5 - i + dx - 1, i + dy));
            }

            if(this.ceils[i + dy][i + dx].ball == colornum)
            {
                ld.push(new Point(i+dx, i+dy));
            }

        }

        if(rd.length == 5)
        {
            this.result = this.result.concat(rd);
            //result.push("диагональ  справа-налево");
        }

        if(ld.length == 5)
        {
            this.result = this.result.concat(ld);
            //result.push("диагональ  слева-направо");
        }

        //return result;
    }

    checklines(colornum, dx, dy) //Вертикаль и горизонталь
    {
        let h = [];
        let v = [];
        for(let row = dx; row < 5 + dx; row++)
        {
            if(this.ceils[dy][row].ball == 1)
            {
                h.push(new Point(row, dy));

            }
            if(this.ceils[row][dy].ball == 1)
            {
                v.push(new Point(dy, row));
            }
        }

        if(h.length == 5)
        {
            this.result = this.result.concat(h);
        }

        if(v.length == 5)
        {
            this.result = this.result.concat(v);
            //result.push("вертикаль");
        }

        //return result;
    }

        setFive()
        {

            //Диагонали
            for(let dy = 0; dy < 6; dy++)
            {
                for(let dx = 0; dx < 6; dx++)
                {
                    this.checkDiagonals(1, dy, dx);
                    /*for(let i = 0; i < arr.length; i++)
                     {
                     alert(arr[i]);
                     }*/
                }

            }

            ////

            for(let dy = 0; dy < 10; dy++)
            {
                for(let dx = 0; dx < 6; dx++)
                {
                    this.checklines(1, dx, dy);
                    /*for(let i = 0; i < arr.length; i++)
                     {
                     alert(arr[i]);
                     }*/

                }
            }


            if(this.result.length > 0)
            {
                alert("Непусто");
            }

            for(let i = 0; i < this.result.length; i++)
            {
                let x = this.result[i].x;
                let y = this.result[i].y;
                this.setBall(x, y, 0);
            }

        }
}
