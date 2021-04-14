/**
 * Created by Pavel on 05.04.2021.
 */
class Game
{
    constructor(cnvid, picpath, size, count)
    {
        this.pic = new Image();
        this.oldX = -1;
        this.oldY = -1;
        this.flag = false;
        this.size = size;
        this.pic.src = picpath;
        this.canvas = document.querySelector(cnvid);
        this.scena = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
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

    setBall(x, y, ballnum, color = "#87CEFA")
    {
        this.ceils[y][x].fieldColor = color;
        this.scena.fillStyle = color;
        this.scena.fillRect(x * this.size + 1 * (x + 10), y * this.size + 1 * (y + 10), this.size, this.size);
        this.ceils[y][x].ball = ballnum;
        let dx = (this.ceils[y][x].ball - 1) * this.ballsize;
        this.scena.drawImage(this.pic, dx, 0, this.ballsize, this.ballsize, x * this.size + 1 * (x + 10) + this.size / 2 - this.ballsize / 2, y * this.size + 1 * (y + 10) + this.size / 2 - this.ballsize /2, 40, 40);

    }

    clicker(ev)
    {
            //let arr;
            //this.result = [];
            if(ev.offsetX > 10 && ev.offsetX < (this.size + 1) * 10 && ev.offsetY > 10 && ev.offsetY < (this.size + 1) * 10)
            {
                    let x = Math.floor((ev.offsetX - 10) / (this.size + 1));
                    let y = Math.floor((ev.offsetY - 10) / (this.size + 1));
                    /*if(this.ceils[y][x].ball > 0)
                    {
                        if(this.flag == false)
                        {
                            this.flag = true;
                        }
                        else
                        {
                            this.setBall(this.oldX,this.oldY,this.ceils[this.oldY][this.oldX].ball);
                        }
                        this.oldX = x;
                        this.oldY = y;
                        this.setBall(x,y,this.ceils[y][x].ball, "#CCCCCC");
                    }
                    else{
                        alert("Перенос");
                    }*/

                    /////
                this.setBall(x,y, 1);
                //this.setFive(1);
                this.setFive(1);
                /*if(this.result.length > 0)
                {
                    alert("Yes   " + this.result.length);
                }*/

            }

            //this.setFive(1);


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

        setFive(colornum)
        {
            //Диагонали
            this.result = [];
            for(let dy = 0; dy < 6; dy++) //6
            {
                for(let dx = 0; dx < 6; dx++) // 6
                {
                    this.checkDiagonals(colornum, dy, dx);

                }

            }

            ////Вертикали и горизонтали.

            for(let dy = 0; dy < 10; dy++)
            {
                for(let dx = 0; dx < 6; dx++)
                {
                    this.checklines(colornum, dx, dy);

                }
            }


            if(this.result.length > 0)
            {

               setTimeout(this.reload.bind(this),500);

            }

        }
        reload()
        {
            for(let i = 0; i < this.result.length; i++)
            {
                let x = this.result[i].x;
                let y = this.result[i].y;
                this.setBall(x, y, 0);
            }

        }

        start()
        {
            for(let y = 0; y < 10; y++) //Стартовая
            {
                for(let x = 0; x < 10; x++)
                {
                    this.setBall(x, y, 0);
                    //this.scena.drawImage(this, 120,0, 40,40, x * size + 1 * (x + 10) + size / 2 - 20, y * size + 1 * (y + 10) + size / 2 - 20, 40, 40);
                }

            }
            this.randomBalls();

        }

    randomInteger(min, max)
    {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    randomBalls() //Переделать.
    {
        let x;
        let y;
        let color = 1;
        for(let i = 0; i < 4; i++)
        {
            do{
                x = this.randomInteger(0, 9);
                y = this.randomInteger(0, 9);
            }while(this.ceils[y][x].ball > 0)
            let color = this.randomInteger(1, 6);
            this.setBall(x, y, color);
            this.setFive(color);
        }


    }


    ///////////////////////////
    setFive2(x, y)
    {
        let color = this.ceils[y][x].ball;
        this.result = [];

        let horisontal = [];
        let vertical = [];
        let flag = true;
        //Горизонтали.
        //alert(x);

        for(let i = 0; i < 6; i++)
        {
            horisontal = [];
            for(let x1 = i; x1 < 5 + i; x1++)
            {
                if(this.ceils[y][x1].ball == color)
                {
                    horisontal.push(new Point(x1, y));
                    //alert();
                }
                alert(horisontal.length);
                /*if(horisontal.length > 5)
                {

                    this.result = this.result.concat(horisontal);
                }
                setTimeout(this.reload.bind(this), 500);*/

            }

        }





      // setTimeout(this.reload.bind(this), 500);

    }

}
